// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BasedPixels is ERC721 {
    uint8  public constant SIDE = 10; // 10 × 10 grid
    uint256 public constant MINT_PRICE   = 0 ether;
    uint256 public constant PIXEL_PRICE  = 0 ether;  

    mapping(uint256 => uint128) private _grid;        
    uint256 private _id;

    constructor() ERC721("BasedPixels", "BPX") {}

    /* ---------- mint blank white canvas ---------- */
    function mint() external payable returns (uint256 tokenId) {
        require(msg.value == MINT_PRICE, "fee");
        tokenId = ++_id;
        _safeMint(msg.sender, tokenId);
    }

    /* ---------- paint a pixel with Based icon ---------- */
    function paint(uint256 tokenId, uint8 x, uint8 y) external payable {
        require(ownerOf(tokenId) == msg.sender, "not owner");
        require(x < SIDE && y < SIDE, "oob");
        require(msg.value == PIXEL_PRICE, "fee");

        uint8 bit = uint8(y * SIDE + x);
        uint128 mask = uint128(1) << bit;
        
        // Toggle the pixel state
        if (_grid[tokenId] & mask == 0) { // If empty, add Based icon
            _grid[tokenId] |= mask;
        } else { // If Based icon exists, remove it
            _grid[tokenId] &= ~mask;
        }
    }

    /* ---------- helper function to count Based icons ---------- */
    function _countBasedIcons(uint128 data) internal pure returns (uint256) {
        uint256 count = 0;
        for (uint8 i = 0; i < 100; ++i) {
            if (data & (uint128(1) << i) != 0) {
                count++;
            }
        }
        return count;
    }

    /* ---------- fully on‑chain metadata + SVG ---------- */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        uint128 gridData = _grid[tokenId];
        string memory svgImage = _svg(gridData);
        uint256 basedIconCount = _countBasedIcons(gridData);

        string memory namePart = string.concat('BasedPixels #', Strings.toString(tokenId));
        string memory descriptionPart = "Dynamic onchain canvas where each pixel can be toggled between blank space and the iconic Base logo.";

        // Build the image data URI (raw SVG)
        string memory imageValue = string.concat("data:image/svg+xml;utf8,", svgImage);

        // Build the attributes JSON
        string memory attributesPart = string.concat(
            ',"attributes":[{"trait_type":"Based Icons","value":"',
            Strings.toString(basedIconCount),
            '"}]'
        );

        // Build the JSON content using abi.encodePacked
        bytes memory jsonBytes = abi.encodePacked(
            '{"name":"', namePart, '",',
            '"description":"', descriptionPart, '",',
            '"image":"', imageValue, '"',
            attributesPart,
            '}'
        );

        // Final data URI for the JSON
        return string.concat("data:application/json;utf8,", string(jsonBytes));
    }

    /* ----------  SVG builder ---------- */
    function _svg(uint128 data) internal pure returns (string memory out) {
        out = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>";
        // Add a white background rectangle
        out = string.concat(out, "<rect width='100' height='100' fill='white'/>");

        for (uint8 i; i < 100; ++i) {
            if (data & (uint128(1) << i) != 0) {
                uint8 x = i % SIDE;
                uint8 y = i / SIDE;
                // Calculate the x and y position for the icon
                string memory xPos = Strings.toString(x * 10);
                string memory yPos = Strings.toString(y * 10);

                // SVG group to scale and translate the icon
                // Scale factor is 10/111 (target size / original size)
                // Original icon is 111x111, we want it to be 10x10
                out = string.concat(
                    out,
                    "<g transform='translate(", xPos, ",", yPos, ") scale(0.09009009)'>", // 10/111 = 0.09009009...
                    "<path d='M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z' fill='#0052FF'/>",
                    "</g>"
                );
            }
        }
        out = string.concat(out, "</svg>");
    }
} 
'use client'
 
import { parseEther, encodeFunctionData } from 'viem'
import { useAccount, useConnect, useDisconnect, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { PageContainer, Title, Card, Button, LoadingSpinner, LoadingContainer } from './StyledComponents';
import { useState, useEffect } from 'react';

// Transaction type definition
type Transaction = {
  type: 'Mint' | 'Paint';
  hash: string;
};

// BasedPixels contract ABI (mint and paint functions)
const basedPixelsAbi = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "x",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "y",
        "type": "uint8"
      }
    ],
    "name": "paint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

const contractAddress = "0x350806561E8cdaF145723e072fdE7268150265cb"; 

// Canvas component to display and interact with the pixels
function PixelCanvas({ tokenId, onPaintTransaction }: { tokenId: string, onPaintTransaction: (hash: string) => void }) {
  const [pixelStates, setPixelStates] = useState(Array(100).fill(false));
  const { sendTransaction, isPending } = useSendTransaction();
  
  const handlePaint = (x: number, y: number) => {
    if (!tokenId || isPending) return;
    
    // Encode parameters using viem's encodeFunctionData
    const data = encodeFunctionData({
      abi: basedPixelsAbi,
      functionName: 'paint',
      args: [BigInt(tokenId), x, y]
    });
    
    sendTransaction({
      to: contractAddress,
      value: parseEther('0'),
      data: data
    }, {
      onSuccess: (data) => {
        // Toggle pixel state locally for immediate feedback
        const newPixelStates = [...pixelStates];
        const pixelIndex = y * 10 + x;
        newPixelStates[pixelIndex] = !newPixelStates[pixelIndex];
        setPixelStates(newPixelStates);
        
        // Record the transaction hash
        onPaintTransaction(data);
      }
    });
  };
  
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Your BasedPixels Canvas (ID: {tokenId})</h3>
      <p>Click on any pixel to toggle the iconic Base logo</p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 30px)',
        gridTemplateRows: 'repeat(10, 30px)',
        gap: '1px',
        border: '1px solid #ddd',
        width: 'fit-content',
        margin: '0 auto',
        opacity: isPending ? 0.7 : 1,
        pointerEvents: isPending ? 'none' : 'auto'
      }}>
        {Array(100).fill(null).map((_, index) => {
          const x = index % 10;
          const y = Math.floor(index / 10);
          
          return (
            <div
              key={index}
              onClick={() => handlePaint(x, y)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: pixelStates[index] ? '#f5f5f5' : 'white',
                border: '1px solid rgba(0,0,0,0.1)',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {pixelStates[index] && (
                <svg viewBox="0 0 111 111" width="25" height="25">
                  <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z" fill="#0052FF"/>
                </svg>
              )}
            </div>
          );
        })}
      </div>
      {isPending && (
        <LoadingContainer>
          <LoadingSpinner />
          <div>Painting pixel...</div>
        </LoadingContainer>
      )}
    </div>
  );
}

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransactionAsync, isPending: isSending, isSuccess: isSent, data: hash } = useSendTransaction()
  const { isLoading: isWaiting, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({
    hash
  })
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Extract token ID from receipt when transaction is confirmed
  useEffect(() => {
    if (isConfirmed && receipt?.logs) {
      // Find the Transfer event from the ERC721 contract
      const transferEvent = receipt.logs.find(log => 
        log.topics?.[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      );
      
      if (transferEvent?.topics?.[3]) {
        // The tokenId is in the third topic
        const tokenId = parseInt(transferEvent.topics[3] as string, 16).toString();
        setMintedTokenId(tokenId);
      }
    }
  }, [isConfirmed, receipt]);

  // Record mint transaction when hash is available
  useEffect(() => {
    if (hash && isSent) {
      // Add mint transaction to history
      setTransactions(prev => [...prev, { type: 'Mint', hash }]);
    }
  }, [hash, isSent]);

  const handleMint = async () => {
    if (account.status !== 'connected') return;
    
    const data = encodeFunctionData({
      abi: basedPixelsAbi,
      functionName: 'mint',
    });

    const tx = await sendTransactionAsync({
      to: contractAddress,
      value: parseEther('0'),
      data: data 
    });
    console.log(tx);
  }

  const handlePaintTransaction = (txHash: string) => {
    setTransactions(prev => [...prev, { type: 'Paint', hash: txHash }]);
  };
  
  return (
    <PageContainer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/basedPixels.png" alt="BasedPixels Logo" style={{ marginRight: '10px', height: '40px' }} />
        <Title>BasedPixels</Title>
        <img src="/basedPixels.png" alt="BasedPixels Logo" style={{ marginLeft: '10px', height: '40px' }} />
      </div>
      
      <Card>
        <div>
          <h2>BasedPixels NFT</h2>
          <p>Mint a 10x10 customizable pixel canvas NFT.</p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {account.status === 'connected' ? (
              <Button type="button" onClick={() => disconnect()}>
                Sign out
              </Button>
            ) : (
              connectors
                .filter((connector) => connector.name === 'Coinbase Wallet')
                .map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    type="button"
                  >
                    Sign in
                  </Button>
                ))
            )}
            
            <Button 
              onClick={handleMint}
              disabled={account.status !== 'connected' || isSending || isWaiting || mintedTokenId !== null}
            >
              {isSending ? 'Minting...' : isWaiting ? 'Confirming...' : mintedTokenId ? 'Minted!' : 'Mint NFT'}
            </Button>

            <Button
              as="a"
              href={mintedTokenId 
                ? `https://testnets.opensea.io/assets/base_sepolia/${contractAddress}/${mintedTokenId}`
                : 'https://testnets.opensea.io/collection/basedpixels'}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on OpenSea
            </Button>
          </div>
          
          {error && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              Error: {error.message || 'Failed to mint NFT'}
            </div>
          )}
        </div>
      </Card>

      {/* Canvas Card */}
      {mintedTokenId && (
        <Card>
          <PixelCanvas tokenId={mintedTokenId} onPaintTransaction={handlePaintTransaction} />
        </Card>
      )}

      {/* Transaction History Card */}
      {transactions.length > 0 && (
        <Card>
          <div>
            <h2>Transaction History</h2>
            <div style={{ 
              maxHeight: '300px', 
              overflowY: 'auto'
            }}>
              {transactions.map((tx, index) => (
                <div key={index} style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                  <span>{tx.type}: </span>
                  <a
                    href={`https://sepolia.basescan.org/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      wordBreak: 'break-all'
                    }}
                  >
                    {`${tx.hash.slice(0, 6)}...${tx.hash.slice(-6)}`}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </PageContainer>
  )
}
 
export default App
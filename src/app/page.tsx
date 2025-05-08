'use client'
 
import { parseEther } from 'viem'
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi'
 
function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  return (
    <>
      <div>
        <h2>Account</h2>
 
        <div>
          Status: {account.status}
          <br />
          Sub Account Address: {JSON.stringify(account.addresses)}
          <br />
          Chain ID: {account.chainId}
        </div>
 
        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
 
      <div>
        <h2>Connect</h2>
        {connectors
          .filter((connector) => connector.name === 'Coinbase Wallet')
          .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              Sign in with Smart Wallet
            </button>
          ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}
 
export default App
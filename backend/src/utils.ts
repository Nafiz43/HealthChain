import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';

// Initialize the client
//const resilientDBClient = new ResilientDB("https://cloud.resilientdb.com", new FetchClient());
const resilientDBClient = new ResilientDB("http://localhost:8000", new FetchClient());

const { publicKey, privateKey } = ResilientDB.generateKeys();

async function createTransaction() {
    const transactionData = {
      operation: "CREATE",
      amount: 5000,
      name: "Nafz",
      PhoneNumber: "530-220-8037",
      signerPublicKey: publicKey,
      signerPrivateKey: privateKey,
      recipientPublicKey: publicKey, // For the sake of example, sending to self
      asset: { message: "Initial transaction" }
    };
    
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log('Transaction posted:', transaction);
    
    return transaction.id; // We'll need the transaction ID to update it next
}
import express, { Request, Response } from 'express';
import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';
import cors from 'cors';

const app = express();
const port = 5050;

app.use(cors());
//app.use(cors());  // This allows requests from all origins
app.use(express.json());

const { publicKey, privateKey } = ResilientDB.generateKeys();
const resilientDBClient = new ResilientDB("http://localhost:8000", new FetchClient());

async function createNewUser(username:string, email:string, Password: string) {
    const transactionData = {
        operation: "CREATE",
        amount: 5000,
        signerPublicKey: publicKey,
        signerPrivateKey: privateKey,
        recipientPublicKey: publicKey, // For the sake of example, sending to self
        asset: {
          message: "Initial transaction",
          email: email,     // Add email to asset
          password: Password, // Add password to asset
          UserName: username
        }
      };
    
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log('Transaction posted:', transaction);
    
    return transaction.id; // We'll need the transaction ID to update it next
}


async function getUserInfo(PublicKey: string, password: string) {
    const filter = {
      ownerPublicKey: PublicKey,
      Password: password
      // recipientPublicKey can also be specified here.
    };
    const transactions = await resilientDBClient.getFilteredTransactions(filter);
    // Access the email
    const tns = transactions[0]; // Assuming we're working with the first transaction
    const asset = JSON.parse(tns.asset.replace(/'/g, '"')); // Replacing single quotes with double quotes to make it valid JSON

    const email = asset.data.email;

    console.log(email); // Outputs: nikhan@ucdavis.edu
    console.log('Filtered Transactions:', transactions);
}


app.post('/signup', async (req: Request, res: Response) => {
    //const resilientDBClient = new ResilientDB("http://localhost:8000", new FetchClient());
    //const { username, email, password } = req.body;
    // console.log('jjjj ', JSON.stringify(req.body))
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(username, email, password)
    try{
      const newUser = createNewUser(username,email,password);
      console.log(newUser)
      res.status(201).send({
        message: "User signed up successfully!",
        publicKey: publicKey
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: "Sign Up failed"
      })
    }

    //Database Connection code goes here

    // try {
    //   const newUser = createNewUser(username,email,password);
  
    //   // await newUser.save();
    //   res.status(201).send({ message: 'User signed up successfully! Your Public Key is: '+ publicKey+'\nUse the public key and password to login to the system' });
    // } catch (error) {
    //   res.status(500).send({ message: 'Error signing up user', error });
    // }

  });


app.post('/login', async (req: Request, res: Response) => {
    //const resilientDBClient = new ResilientDB("http://localhost:8000", new FetchClient());
    //const { username, email, password } = req.body;
    const PublicKey = req.body.publicKey;
    const password = req.body.password;
    const username = req.body.username
    console.log(username, password, PublicKey)

    
    // try {
    //   const newUser = getUserInfo(req.body.publicKey,req.body.password);
    //   console.log(newUser)
  
    //   // await newUser.save();
    //   res.status(201).send({ message: 'LOGIN' });
    // } catch (error) {
    //   res.status(500).send({ message: 'LOG-IN Failed', error });
    // }
    console.log("logInSuccesful")
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
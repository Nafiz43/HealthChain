import express, { Request, Response } from 'express';
import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';
import cors from 'cors';
import bodyParser from 'body-parser';
import { emit } from 'process';


const app = express();
const port = 5050;

app.use(cors());
//app.use(cors());  // This allows requests from all origins
app.use(express.json());
app.use(bodyParser.json());


const { publicKey, privateKey } = ResilientDB.generateKeys();
const resilientDBClient = new ResilientDB("http://localhost:8000", new FetchClient());


async function createNewUser(username: string, email: string, password: string, role: string) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds

  const transactionData = {
      operation: "CREATE",
      amount: 1010,
      signerPublicKey: publicKey,
      signerPrivateKey: privateKey,
      recipientPublicKey: publicKey, 
      asset: {
          message: "SIGN-Up",
          email: email,
          password: password,
          username: username,
          role: role,
          timestamp: currentTimestamp // Add the Unix timestamp here
      }
  };

  const transaction = await resilientDBClient.postTransaction(transactionData);
  console.log('Transaction posted:', transaction);

  return transaction.id;
}



async function getUserInfo(PublicKey: string) {
    const filter = {
      ownerPublicKey: PublicKey
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
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;



    console.log(username, email, password, role)

    let allTransactions = await resilientDBClient.getAllTransactions();
    console.log(allTransactions.length)

    let flag = 0;
    let i = 0;
    for(i = 0; i < allTransactions.length; i++) {
        let tx = allTransactions[i];
        if (tx.asset) {
           let tx_asset = tx.asset.replace(/'/g, '"')
           let json_tx_asset = JSON.parse(tx_asset)
           console.log(json_tx_asset.data.username)
           if(json_tx_asset.data.username == username) {
              console.log('user name found');
              flag = 1;
              break;
           }
        }
    }
    console.log('flag ', flag)
    if(flag == 0) {
      const newUser = createNewUser(username,email,password, role);
      console.log(newUser)
      res.status(201).send({
          message: "User signed up successfully!",
          publicKey: publicKey
      })
    }
    else {
      try{
        console.log('user found in the system')
        res.status(205).send({
          message: "User name existed, Please try a new user name",
        })
      } catch (err) {
        console.log(err)
      }
    }



    // const newUser = await createNewUser(username,email,password, role);
    // console.log(newUser)
    // res.status(201).send({
    //   message: "User signed up successfully!",
    //   publicKey: publicKey
    // })

    //Database Connection code goes here

    // try {
    //   const newUser = createNewUser(username,email,password);
  
    //   // await newUser.save();
    //   res.status(201).send({ message: 'User signed up successfully! Your Public Key is: '+ publicKey+'\nUse the public key and password to login to the system' });
    // } catch (error) {
    //   res.status(500).send({ message: 'Error signing up user', error });
    // }

  });




app.post('/logout', async (req: Request, res: Response) => {
  res.status(201).send({
    message: "Logged Out Successfully!"
  })
  });

app.post('/patient_index', async (req: Request, res: Response) => {
    res.status(201).send({
      message: "Patient Dashboard!"
    })
    });
    

app.post('/doctor_index', async (req: Request, res: Response) => {
    res.status(201).send({
      message: "Doctor Dashboard!"
    })
    });

app.post('/admin_index', async (req: Request, res: Response) => {
      res.status(201).send({
        message: "Admin Dashboard!"
      })
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

    res.status(201).send({
      message: "Doctor"
    })


    console.log("logInSuccesful")
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});



app.post('/bookAppointment', (req, res) => {
  const appointment = req.body; // Example { date, time, doctor, reason }
  console.log(req.body)
  // Add logic to store the appointment in the database
  res.json({ message: 'Appointment booked successfully!' });
});

app.get('/PatientViewAppointments', (req, res) => {
  // Fetch appointments from the database
  res.json({ appointments: [{ date: '2024-11-30', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' }, { date: '2024-11-30', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' }] });
});

app.get('/PatientViewMedications', (req, res) => {
  // Fetch medications from the database
  res.json({ medications: [{ date: '2024-11-01', medicine: 'Paracetamol', dosage: '500mg', doctor: 'Dr. Lee', usageGuide: 'Twice a day' }] });
});


app.post('/UpdateProfile', (req, res) => {
  const updatedProfile = req.body; // Example { fullName, dob, ssn, phoneNumber, email }
  console.log(updatedProfile)

  // Update the profile in the database
  res.json({ message: 'Profile updated successfully!' });
});


app.post('/addMedication', (req, res) => {
  const medication = req.body; // Example { date, time, doctor, reason }
  console.log(req.body)
  // Add logic to store the appointment in the database
  res.json({ message: 'Medication Added Successfully!' });
});

app.get('/DoctorViewMedications', (req, res) => {
  // Fetch medications from the database
  res.json({ medications: [{ patientUsername: 'Nafiz43', prescribedDate: '2020-02-02', medicineName: 'paracetomol', dosage: '500mg', usageGuide: 'Twice a day' }] });
});

app.get('/viewPatients', (req, res) => {
  // Fetch medications from the database
  res.json({ patients: [{ userName: 'Nafiz43', email: '2020-02-02', phoneNumber: 'paracetomol', publicKey: '500mg', lastUpdated: 'Twice a day' }] });
});


app.get('/viewDoctors', (req, res) => {
  // Fetch medications from the database
  res.json({ doctors: [{ userName: 'Nafiz43', email: '2020-02-02', phoneNumber: 'paracetomol', publicKey: '500mg', lastUpdated: 'Twice a day'  }] });
});


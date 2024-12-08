import express, { Request, Response } from 'express';
import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';
import cors from 'cors';
import bodyParser from 'body-parser';
import { emit } from 'process';
import { timeEnd } from 'console';

const app = express();
const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 5050);

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
          secretKey: privateKey,
          timestamp: currentTimestamp // Add the Unix timestamp here  5s5aqjQ8dkXWaKHU9LscxjzJHUXicf6FMQ29TmeNmoDA
      }
  };

  const transaction = await resilientDBClient.postTransaction(transactionData);
  console.log('Transaction posted:', transaction);

  return transaction.id;
}



async function getUserInfo(PublicKey: string, username: string) {
    const filter = {
      ownerPublicKey: PublicKey
      // recipientPublicKey can also be specified here.
    };
    const transactions = await resilientDBClient.getFilteredTransactions(filter);
    // Access the email
    console.log(username)
    let tns = null;
    for(let i = 0; i< transactions.length; i++) {
      const transaction = transactions[i];
      try {
        const asset = JSON.parse(transaction.asset.replace(/'/g, '"'));
        
        if (asset.data.message === 'SIGN-Up' && asset.data.username === username) {
          tns = transaction;
          console.log(tns);
          break; // Exit the loop when the first matching transaction is found
        }
      } catch (error) {
        console.error('Error parsing transaction asset:', error);
      }
    }
    
    // Check if `tns` is defined
    if (tns) {
      try {
        const asset = JSON.parse(tns.asset.replace(/'/g, '"'));
        console.log('Parsed asset:', asset);
        return tns;
      } catch (error) {
        console.error('Error parsing tns asset:', error);
      }
    } else {
      console.log('No matching transaction found.');
      return null;
    }
    // const tns = transactions[0]; // Assuming we're working with the first transaction
}

async function getRoleBasedList(role: String) {
    let allTransactions = await resilientDBClient.getAllTransactions();
    console.log(allTransactions)
    
    let roleBasedList = [];
    let updateTransactions = [];
    for (let i = 0; i < allTransactions.length; i++) {
        const transaction = allTransactions[i];
        const asset = JSON.parse(transaction.asset.replace(/'/g, '"'));
        if(asset.data.role == role && asset.data.message == 'SIGN-Up') {
            roleBasedList.push(asset.data.username);
        }

        if(asset.data.role == role && asset.data.message == 'Update Profile') {
            updateTransactions.push(asset.data);
        }
    }

    let roleList = []
    for (let i = 0; i < roleBasedList.length; i++) {
        let user = roleBasedList[i];
        let updateUser = [];
        for (let j = 0; j < updateTransactions.length; j++) {
            let updateTransaction = updateTransactions[j];
            // const asset = JSON.parse(updateTransaction.asset.replace(/'/g, '"'));
             //console.log(updateTransaction)
            if (updateTransaction.username && updateTransaction.username == user) {
                updateUser.push(updateTransaction)
            }

        }
        console.log(updateUser)
        if(updateUser.length > 0) {
          const latest = updateUser.reduce((max, obj) => (obj.timestamp > max.timestamp ? obj : max), updateUser[0]);
          roleList.push(latest)
        }

    }
    return roleList;
}



async function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
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
    // const newUser = createNewUser(username,email,password, role);
    // console.log(newUser)
    // res.status(201).send({
    //     message: "User signed up successfully!",
    //     publicKey: publicKey
    // })
    if(flag == 0) {
      try{
        const newUser = await createNewUser(username,email,password, role);
        console.log(newUser)
        res.status(201).send({
            message: "User signed up successfully!",
            publicKey: publicKey
        })
        } catch (err) {
           console.log(err)
        }
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



    // 6dcovaDR2yM9v4hMi9DVnivqt7A3xXDPCZSVWEbwaVXp

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
    let role;
    let pvtKey;

    try {
      const userInfo = await getUserInfo(PublicKey, username);
      console.log("userInfo");
      console.log(userInfo);
      if (userInfo) {
        const asset = userInfo.asset;
        const jsonObj = asset.replace(/'/g, '"');
        // Parse the JSON string
        const t = JSON.parse(jsonObj);
        role = t.data.role;
        pvtKey = t.data.secretKey;
        if((t.data.password != password) || (t.data.username != username))
        {
          console.log("Wrong username or Password")
          res.status(205).send({message: "Wrong Username or Password"})
        }
        else
        {
          res.status(201).send({
            message: "Login Successful",
            role: role,
            publicKey: PublicKey,
            username: username,
            secKey: pvtKey
          })
        }
      }
      else
      {
        res.status(205).send({message: "Unknown Error"})
      }
    } catch (err) {
      console.log(err)
    }

    // console.log("kkk ", role)
    
    // try {
    //   const newUser = getUserInfo(req.body.publicKey,req.body.password);
    //   console.log(newUser)
  
    //   // await newUser.save();
    //   res.status(201).send({ message: 'LOGIN' });
    // } catch (error) {
    //   res.status(500).send({ message: 'LOG-IN Failed', error });
    // }
    // console.log(username)

    });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.listen(port, host, () => {
  console.log(`Backend is running at http://${host}:${port}`);
});



app.post('/bookAppointment', async (req, res) => {
  //let secKey:String;
  const appointment = req.body; // Example { date, time, doctor, reason }
  const date = req.body.date;
  const time = req.body.time;
  const doctor = req.body.doctor;
  const reason = req.body.reason;
  const pubKey = req.query.publicKey;
  const username = req.query.username;
  const secKey = req.query.secKey;
  console.log(req.body)
  console.log(pubKey)
  console.log(secKey)

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds

  const transactionData = {
    operation: "CREATE",
    amount: 1020,
    signerPublicKey: pubKey?.toString() || "default-public-key",
    signerPrivateKey: secKey?.toString() || "default-private-key",
    recipientPublicKey: pubKey?.toString() || "default-recipient-key",
    asset: {
        message: "Appointment",
        username: username,
        date: date,
        time: time,
        doctor: doctor,
        reason: reason,
        status: "Pending",
        publicKey: pubKey,
        timestamp: currentTimestamp
    }
  };

  try{
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log(transaction)
    res.json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    console.log("Error Booking Appointments");
    console.log(err)
  }  
});

app.get('/PatientViewAppointments', async (req, res) => {
  // Fetch appointments from the database
  console.log(req.query.publicKey)
  const filter = {
    ownerPublicKey: req.query.publicKey?.toString() || "default-public-key"
    // recipientPublicKey can also be specified here.
  };

  try{
    const transactions = await resilientDBClient.getAllTransactions();
    console.log(transactions)
    let appointments = []
    let acc_rej = []
    for(let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        let tx_asset = t.asset.replace(/'/g, '"');
        let json_tx_asset = JSON.parse(tx_asset);
        if(json_tx_asset.data.message == 'Appointment' && json_tx_asset.data.date) {
          console.log(json_tx_asset);
          appointments.push(json_tx_asset.data);
        }
        if(json_tx_asset.data.message == 'Appointment' && json_tx_asset.data.date && (json_tx_asset.data.status == 'Accepted' || json_tx_asset.data.status == 'Rejected')) {
          acc_rej.push(json_tx_asset.data);
        }
    }
 let difference = appointments.filter(
      aItem => !acc_rej.some(bItem => 
        aItem.username === bItem.username && 
        aItem.time === bItem.time && 
        aItem.date === bItem.date &&
        aItem.status === "Pending"
      )
    );
    console.log("aaa ", difference)
    res.json({ appointments: difference });

  } catch (err) {
    console.log(err)
  }
});

app.get('/PatientViewMedications', async (req, res) => {
  try {
    const user = req.query.username;
    console.log(user)
    // const filter = {
    //   ownerPublicKey: req.query.publicKey?.toString() || "default-public-key"
    //   // recipientPublicKey can also be specified here.
    // };
    const transactions = await resilientDBClient.getAllTransactions();
    console.log("oo ", transactions)
    let docMed = [];
    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];
      let tx_asset = t.asset.replace(/'/g, '"');
      let json_tx_asset = JSON.parse(tx_asset);
      if(json_tx_asset.data.message == 'add_medication' && json_tx_asset.data.patientName == user) {
        //console.log(json_tx_asset);
        json_tx_asset.data.date = await timestampToDate(json_tx_asset.data.timestamp);
        json_tx_asset.data.date = json_tx_asset.data.date.split(',')[0];
        docMed.push(json_tx_asset.data);
      }
    }
    console.log('dd ', docMed);
    res.json({ medications: docMed});
  } catch (err) {
    console.log(err)
  }
});


app.post('/UpdateProfile', async (req, res) => {
  const updatedProfile = req.body; // Example { fullName, dob, ssn, phoneNumber, email }
  const pubKey = req.query.publicKey;
  const username = req.query.username;
  const pvtKey = req.query.secKey;
  const role = req.query.role;
  updatedProfile.username = username;
  updatedProfile.role = role;

  console.log("updated profile")
  console.log(updatedProfile)

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds
  updatedProfile.timestamp = currentTimestamp;
  updatedProfile.message = 'Update Profile'

  const transactionData = {
      operation: "CREATE",
      amount: 1010,
      signerPublicKey: pubKey?.toString() || "default-public-key",
      signerPrivateKey: pvtKey?.toString() || "default-private-key",
      recipientPublicKey: pubKey?.toString() || "default-public-key", 
      asset: updatedProfile
  };
  console.log(updatedProfile)
  try {
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log(transaction)

  } catch (err) {
    console.log(err)
  }
  // Update the profile in the database
  res.json({ message: 'Profile updated successfully!' });
});


app.post('/addMedication', async (req, res) => {
  const medication = req.body; // Example { date, time, doctor, reason }
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds

  console.log(req.body) // CmgRxRjkicerkUL9Q84ExhmAUhxEEoMCs4iNQGRXWsFh popopo po@gmail.com patient
                        // Smith sm@gmail.com doctor CmgRxRjkicerkUL9Q84ExhmAUhxEEoMCs4iNQGRXWsFh
  
  
  const pubKey = req.query.publicKey;
  const pvtKey = req.query.secretKey;
  const { publicKey, privateKey } = ResilientDB.generateKeys();
  medication.doctor = req.query.username;
  medication.timestamp = currentTimestamp;
  medication.message = 'add_medication'
  const transactionData = {
    operation: "CREATE",
    amount: 1020,
    signerPublicKey: pubKey?.toString() || "default-public-key",
    signerPrivateKey: pvtKey?.toString() || "default-private-key",
    recipientPublicKey: pubKey?.toString() || "default-recipient-key",
    asset: medication
  };
  console.log(transactionData)
  try{
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log(transaction)
  } catch (err) {
    console.log(err)
  }

  
  // Add logic to store the appointment in the database
  res.json({ message: 'Medication Added Successfully!' });
});

app.get('/DoctorViewMedications', async (req, res) => {
  // Fetch medications from the database
  try {
    console.log("klkl ",req.query.publicKey);
    const user = req.query.username;
    const filter = {
      ownerPublicKey: req.query.publicKey?.toString() || "default-public-key"
      // recipientPublicKey can also be specified here.
    };
    const transactions = await resilientDBClient.getFilteredTransactions(filter);
    let docMed = [];
    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];
      let tx_asset = t.asset.replace(/'/g, '"');
      let json_tx_asset = JSON.parse(tx_asset);
      if(json_tx_asset.data.message == 'add_medication' && json_tx_asset.data.doctor == user) {
        //console.log(json_tx_asset);
        json_tx_asset.data.date = await timestampToDate(json_tx_asset.data.timestamp);
        json_tx_asset.data.date = json_tx_asset.data.date.split(',')[0];
        docMed.push(json_tx_asset.data);
      }
    }
    console.log('dd ', docMed);
    res.json({ medications: docMed});
  } catch (err) {
    console.log(err)
  }
});

app.get('/viewPatients', async (req, res) => {
  // Fetch medications from the database
  try {
    let p = await getRoleBasedList('Patient');
    for(let i = 0; i < p.length; i++) {
      p[i].lastUpdated = await timestampToDate(p[i].timestamp)
    }
    console.log("pp ", p)
    res.json({ patients: p });
  } catch (err) {
    console.log(err)
  }
});


app.get('/viewDoctors', async (req, res) => {
  // Fetch medications from the database
  try {
    let d = await getRoleBasedList('Doctor');
    for(let i = 0; i < d.length; i++) {
        d[i].lastUpdated = await timestampToDate(d[i].timestamp)
    } 
    console.log("pp doc ", d)
    res.json({ doctors: d });
  } catch (err) {
    console.log(err) //You public key is : 3dfR6tiHP1vKJCdRQRteSmvaXnfTDPU9YPwDMR1Atmwa p2
  }});



app.get('/ApproveAppointments', async (req, res) => {
  try {
    const user = req.query.username;
    console.log('user ', user)
    const transactions = await resilientDBClient.getAllTransactions();
    // console.log("lll",transactions)
    let docMed = [];
    let pendingList = [];
    let accept_reject_list = []
    for (let i = 0; i < transactions.length; i++) {
      let t = transactions[i];

      let tx_asset = t.asset.replace(/'/g, '"');
      let json_tx_asset = JSON.parse(tx_asset);
      //const pending_l = { username: json_tx_asset.data.user}
      let acc_rej_l = {}
      if(json_tx_asset.data.message == 'Appointment' && json_tx_asset.data.doctor == user) {
        const pending_l = { 
          username: json_tx_asset.data.username,
          time: json_tx_asset.data.time,
          doctor: json_tx_asset.data.doctor,
          publicKey: json_tx_asset.data.publicKey,
          date: json_tx_asset.data.date
        }
        if(json_tx_asset.data.status == 'Pending') {
          pendingList.push(pending_l);
          docMed.push(json_tx_asset.data);
        } else if(json_tx_asset.data.status == 'Accepted' || json_tx_asset.data.status == 'Rejected') {
          accept_reject_list.push(pending_l);
        }
        // users.push(json_tx_asset.data.username)
      }
      //console.log('lkjh ', accept_reject_list)

    }
    console.log('ppp ', pendingList)
    console.log('llll ', accept_reject_list)
    let difference = pendingList.filter(
      aItem => !accept_reject_list.some(bItem => 
        aItem.username === bItem.username && 
        aItem.time === bItem.time && 
        aItem.doctor === bItem.doctor
      )
    );
    console.log('gfhj ', difference)
    
    let result = docMed.filter(
      aItem => difference.some(bItem => 
        aItem.username === bItem.username && 
        aItem.time === bItem.time && 
        aItem.doctor === bItem.doctor      
      )
    );

    console.log("rrr ",result);
    res.status(201).send( {appointments: result});
  } catch (err) {
    console.log(err)
  }
  // res.json({
  //   appointments: [
  //     {
  //       date: '2024-11-27',
  //       patientUsername: 'JohnDoe',
  //       time: '10:30 AM',
  //       reason: 'Routine Checkup',
  //     },
  //     {
  //       date: '2024-11-28',
  //       patientUsername: 'JaneDoe',
  //       time: '2:00 PM',
  //       reason: 'Follow-up Consultation',
  //     },
  //   ],
  // });
});

// app.post('Acc')



// Approve Appointment API
app.post('/accept-appointment', async (req, res) => {
  const info = req.body;
  console.log('info ', info)
  const pubKey = req.query.publicKey;
  const doctor = req.query.username;
  const pvtKey = req.query.secKey;
  info.doctor = doctor;
  info.status = 'Accepted';
  info.publicKey = pubKey;

  //console.log("updated profile")
  //console.log(updatedProfile)

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds
  info.timestamp = currentTimestamp;
  info.message = 'Appointment'

  const transactionData = {
      operation: "CREATE",
      amount: 1010,
      signerPublicKey: pubKey?.toString() || "default-public-key",
      signerPrivateKey: pvtKey?.toString() || "default-private-key",
      recipientPublicKey: pubKey?.toString() || "default-public-key", 
      asset: info
  };
  console.log(info)
  try {
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log(transaction);
    res.json({ success: true});
  } catch (err) {
    console.log(err)
  }
  //console.log(req.body)
});

app.post('/reject-appointment', async (req, res) => {
  const info = req.body;
  const pubKey = req.query.publicKey;
  const doctor = req.query.username;
  const pvtKey = req.query.secKey;
  info.doctor = doctor;
  info.status = 'Rejected';
  // info.publicKey = publicKey;

  //console.log("updated profile")
  //console.log(updatedProfile)

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current Unix timestamp in seconds
  info.timestamp = currentTimestamp;
  info.message = 'Appointment'

  const transactionData = {
      operation: "CREATE",
      amount: 1010,
      signerPublicKey: pubKey?.toString() || "default-public-key",
      signerPrivateKey: pvtKey?.toString() || "default-private-key",
      recipientPublicKey: pubKey?.toString() || "default-public-key", 
      asset: info
  };
  console.log(info)
  try {
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log(transaction)
    res.json({ success: true});

  } catch (err) {
    console.log(err)
  }
});

import { connectDatabase, insertDocuments } from "@/helpers/db-util";

const handler = async (req, res) => {
  let client;

  if (req.method === 'POST') {
    const  userEmail = req.body.email;
    
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid Email Address'})
      return;
    }


    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connecting to database failed'});
      return;
    }

    try {
      await insertDocuments(client, 'newsletter', {email: userEmail});
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'});
      return;
    }
    
    console.log(userEmail);
    res.status(201).json({message: 'Signed Up!'})

  }
}

export default handler
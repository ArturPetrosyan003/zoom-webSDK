import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { useEffect, useRef } from "react";

const crypto = require('crypto');

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}

function App() {
  const client = ZoomMtgEmbedded.createClient();

  const element = useRef(null);

  const token = 'qFMHfIxPRoii-t4IoBgLQQ';
  const signature = generateSignature('qFMHfIxPRoii-t4IoBgLQQ', 'jypK2mbMgaqtfLldzdElXs6EuR44AXJDlqBo', 79055162818, 0);

  useEffect(() => {
    client.init({
      debug: true,
      zoomAppRoot: element.current,
      language: 'en-US'
    }).then(() => {
      client.join({
        apiKey: token,
        signature: signature,
        meetingNumber: 79055162818, //meeting id
        password: 11111111, //meeting password
        userName: 'bot'
      }).then(() => {
        console.log('Success');
      }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
  }, []);

  return (
    <div ref={element}>

    </div>
  );
}

export default App;

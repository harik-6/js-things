import { EventSourcePolyfill } from 'event-source-polyfill';

function Sse() {
  function connect() {
    let sseClient = new EventSourcePolyfill("ws://localhost:7002/v1/webevents*",{
      headers : {
        authorization : `Intuit_IAM_Authentication intuit_appid=Intuit.services.gateway.iceregressionservice,intuit_app_secret=preprdtCglVZWeRGMqonakCLaLOGXIwQ0JbHYSNt,intuit_token_type="IAM-Ticket", intuit_token=V1-188-B3m6711510b83vipdwim5m intuit_userid=9130355779055726`,
      },
      withCredentials: true
    })

    sseClient.onopen = (...args)=>{
      console.log("onopen",args);
    }

    sseClient.onmessage = (message) => {
      console.log("onmessage",message);
    }
  }

  return (
    <>
    <h2>SSE ice connection</h2>
    <button onClick={connect} >Connect</button>
    </>
  )
}

export default Sse;
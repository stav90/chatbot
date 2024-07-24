// import * as sdk from "microsoft-cognitiveservices-speech-sdk";
// import { PassThrough } from "stream";

// export async function GET(req) {
//     const speechConfig = sdk.SpeechConfig.fromSubscription(
//         process.env.SPEECH_KEY,
//         process.env.SPEECH_REGION
//     );

//     // const teacher = req.nextUrl.searchParams.get("teacher") || "Nanami";
//     speechConfig.speechSynthesisVoiceName = `en-AU-WilliamNeural`;

//     // en-AU-NatashaNeural (Female)
//     // en-AU-WilliamNeural (Male)
//     // en-AU-AnnetteNeural (Female)
//     // en-AU-CarlyNeural (Female)
//     // en-AU-DarrenNeural (Male)
//     // en-AU-DuncanNeural (Male)
//     // en-AU-ElsieNeural (Female)
//     // en-AU-FreyaNeural (Female)
//     // en-AU-JoanneNeural (Female)
//     // en-AU-KenNeural (Male)
//     // en-AU-KimNeural (Female)
//     // en-AU-NeilNeural (Male)
//     // en-AU-TimNeural (Male)
//     // en-AU-TinaNeural (Female)

//     const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
//     const visemes = [];
//     speechSynthesizer.visemeReceived = function (s, e) {
//     //   console.log(
//     //     "(Viseme), Audio offset: " +
//     //       e.audioOffset / 10000 +
//     //       "ms. Viseme ID: " +
//     //       e.visemeId
//     //   );
//       visemes.push([e.audioOffset / 10000, e.visemeId]);
//     };
//     const audioStream = await new Promise((resolve, reject) => {
//         speechSynthesizer.speakTextAsync(
//             req.nextUrl.searchParams.get("text") ||
//               "I'm excited to try text to speech",
//             (result) => {
//               const { audioData } = result;
      
//               speechSynthesizer.close();
      
//               // convert arrayBuffer to stream
//               const bufferStream = new PassThrough();
//               bufferStream.end(Buffer.from(audioData));
//               resolve(bufferStream);
//             },
//             (error) => {
//               console.log(error);
//               speechSynthesizer.close();
//               reject(error);
//             }
//           );
//     });
//     const response = new Response(audioStream, {
//         headers: {
//           "Content-Type": "audio/mpeg",
//           "Content-Disposition": `inline; filename=tts.mp3`,
//           Visemes: JSON.stringify(visemes),

//         },
//       });
//       // audioStream.pipe(response);
//       return response;
    
// }
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { PassThrough } from "stream";

export async function GET(req) {
  // WARNING: Do not expose your keys
  // WARNING: If you host publicly your project, add an authentication layer to limit the consumption of Azure resources

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env["SPEECH_KEY"],
    process.env["SPEECH_REGION"]
  );

  // https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts
  const teacher = req.nextUrl.searchParams.get("teacher") || "Nanami";
  speechConfig.speechSynthesisVoiceName = `en-AU-WilliamNeural`;

  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
  const visemes = [];
  speechSynthesizer.visemeReceived = function (s, e) {
    // console.log(
    //   "(Viseme), Audio offset: " +
    //     e.audioOffset / 10000 +
    //     "ms. Viseme ID: " +
    //     e.visemeId
    // );
    visemes.push([e.audioOffset / 10000, e.visemeId]);
  };
  const audioStream = await new Promise((resolve, reject) => {
    speechSynthesizer.speakTextAsync(
      req.nextUrl.searchParams.get("text") ||
        "I'm excited to try text to speech",
      (result) => {
        const { audioData } = result;

        speechSynthesizer.close();

        // convert arrayBuffer to stream
        const bufferStream = new PassThrough();
        bufferStream.end(Buffer.from(audioData));
        resolve(bufferStream);
      },
      (error) => {
        console.log(error);
        speechSynthesizer.close();
        reject(error);
      }
    );
  });
  const response = new Response(audioStream, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `inline; filename=tts.mp3`,
      Visemes: JSON.stringify(visemes),
    },
  });
  // audioStream.pipe(response);
  return response;
}
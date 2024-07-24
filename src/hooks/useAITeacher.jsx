const { create } = require("zustand");

export const teachers = ["Nanami", "Naoki"];


export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
//   setTeacher: (teacher) => {
//     set(() => ({
//       teacher,
//       messages: get().messages.map((message) => {
//         message.audioPlayer = null; // New teacher, new Voice
//         return message;
//       }),
//     }));
//   },
//   classroom: "default",
//   setClassroom: (classroom) => {
//     set(() => ({
//       classroom,
//     }));
//   },
  loading: false,
//   furigana: true,
//   setFurigana: (furigana) => {
//     set(() => ({
//       furigana,
//     }));
//   },
//   english: true,
//   setEnglish: (english) => {
//     set(() => ({
//       english,
//     }));
//   },
//   speech: "formal",
//   setSpeech: (speech) => {
//     set(() => ({
//       speech,
//     }));
//   },
  askAI: async (answer) => {
    // if (!question) {
    //   return;
    // }
    console.log(answer, 'insideAskAI');
    set(() => ({
      loading: true,
    }));

    get().playMessage(answer);
    
  },
  playMessage: async (message) => {
    // console.log(message.text, 'insidePlayMessage');
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));
      // Get TTS
      const audioRes = await fetch(
        `/api/tts?teacher=${get().teacher}&text=${message.text}`
      );
      const audio = await audioRes.blob();
      const visemes = JSON.parse(await audioRes.headers.get("visemes"));
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.visemes = visemes;
      message.audioPlayer = audioPlayer;
      message.audioPlayer.onended = () => {
        set(() => ({
          currentMessage: null,
        }));
      };
      set(() => ({
        loading: false,
        messages: get().messages.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        }),
      }));
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },
  stopMessage: (message) => {
    message.audioPlayer.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
}));
export let assistantId = ""; // set your assistant ID here

if (assistantId === "" && process.env.OPENAI_ASSISTANT_ID) {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}

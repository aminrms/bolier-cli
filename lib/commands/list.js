const templates = {
  "nextjs-boilerplate": "A Next.js boilerplate with TypeScript",
  "react-boilerplate": "A React boilerplate with Redux",
  "flutter-boilerplate": "A Flutter boilerplate with basic setup",
  "react-native-boilerplate": "A React Native boilerplate with navigation",
};

export function listTemplate() {
  console.log("Available templates: ");
  for (const [key, description] of Object.entries(templates)) {
    console.log(`- ${key} - ${description}`);
  }
}



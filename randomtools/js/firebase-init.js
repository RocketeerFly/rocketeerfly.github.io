const firebaseConfig = {
  apiKey: "AIzaSyBu2LARfgEYapSkbEg4xMIswnsRb9N5pdQ",
  authDomain: "random-tools-f9798.firebaseapp.com",
  databaseURL: "https://random-tools-f9798.firebaseio.com",
  projectId: "random-tools-f9798",
  storageBucket: "random-tools-f9798.firebasestorage.app",
  messagingSenderId: "1027116634814",
  appId: "1:1027116634814:web:87bb3b3e355f1df48b44ef",
  measurementId: "G-80KY13LLFD"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

const Analytics = {
  logEvent(name, params) {
    try { analytics.logEvent(name, params); } catch {}
  },
  logToolUse(toolName, params) {
    this.logEvent('tool_use', { tool_name: toolName, ...params });
  }
};

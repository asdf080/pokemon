export default function switchColor(color) {
  switch (color) {
    case "red":
      document.documentElement.style.setProperty("--mainColor", "#ff8a80");
      document.documentElement.style.setProperty("--mainColor2", "#ff9b93");
      document.documentElement.style.setProperty("--mainColor3", "#d6a29d");
      break;

    case "white":
      document.documentElement.style.setProperty("--mainColor", "#c3d4e5");
      document.documentElement.style.setProperty("--mainColor2", "#d0d6e1");
      document.documentElement.style.setProperty("--mainColor3", "#bfc1c5");
      break;
    case "green":
      document.documentElement.style.setProperty("--mainColor", "#81C784");
      document.documentElement.style.setProperty("--mainColor2", "#94cf96");
      document.documentElement.style.setProperty("--mainColor3", "#badbbb");
      break;
    case "blue":
      document.documentElement.style.setProperty("--mainColor", "#81D4FA");
      document.documentElement.style.setProperty("--mainColor2", "#bee5ee");
      document.documentElement.style.setProperty("--mainColor3", "#b3e0eb");
      break;
    case "yellow":
      document.documentElement.style.setProperty("--mainColor", "#F2CB55");
      document.documentElement.style.setProperty("--mainColor2", "#f1e984");
      document.documentElement.style.setProperty("--mainColor3", "#efe56f");
      break;
    case "purple":
      document.documentElement.style.setProperty("--mainColor", "#AD8EE7");
      document.documentElement.style.setProperty("--mainColor2", "#b4a3d4");
      document.documentElement.style.setProperty("--mainColor3", "#b4a3d4");
      break;
    case "pink":
      document.documentElement.style.setProperty("--mainColor", "#E98ACC");
      document.documentElement.style.setProperty("--mainColor2", "#f39ebb");
      document.documentElement.style.setProperty("--mainColor3", "#F8BBD0");
      break;

    default:
      document.documentElement.style.setProperty("--mainColor", "#BCAAA4");
      document.documentElement.style.setProperty("--mainColor2", "#cfc5c5");
      document.documentElement.style.setProperty("--mainColor3", "#c7bbbb");
      break;
  }
}

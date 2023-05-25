import { SplashScreen } from "@capacitor/splash-screen";
import { CapacitorUpdater } from "@capgo/capacitor-updater";

export default async function AppVersionSync() {
  CapacitorUpdater.notifyAppReady();

  // Show splash screen until the app is ready
  SplashScreen.show({ autoHide: false });

  // Check for updates
  const releases = await fetch(
    // ! ▼ Change this URL to your repository URL!
    "https://api.github.com/repos/rhea-so-lab/capacitor-codepush-boilerplate/releases/latest",
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const json = await releases.json();

  // Can't find any releases
  if (json.message === "Not Found") {
    SplashScreen.hide();
  }

  // Get the latest version download URL and version
  const url = json.assets.pop()?.browser_download_url;
  const version = json.tag_name.replaceAll(/v/g, "");

  // Can't find the latest version download URL
  if (!url) {
    SplashScreen.hide();
  }

  // If the current version is not the latest version, download the latest version
  const currentVersion = (await CapacitorUpdater.current()).bundle.version;
  if (currentVersion !== version) {
    const data = await CapacitorUpdater.download({ url, version });
    await CapacitorUpdater.set(data);
  }

  // Hide splash screen
  SplashScreen.hide();
}

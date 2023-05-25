import { SplashScreen } from "@capacitor/splash-screen";
import { CapacitorUpdater } from "@capgo/capacitor-updater";

export default async function AppVersionSync() {
  CapacitorUpdater.notifyAppReady();

  // Show splash screen until the app is ready
  SplashScreen.show({ autoHide: false });

  try {
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

    // If, any releases exist
    if (json.message !== "Not Found") {
      const latestVersion = json.tag_name?.replaceAll(/v/g, "");
      const currentVersion = (await CapacitorUpdater.current()).bundle.version;

      if (latestVersion && currentVersion !== latestVersion) {
        const downloadURL = json.assets?.pop()?.browser_download_url;

        if (downloadURL) {
          const data = await CapacitorUpdater.download({
            url: downloadURL,
            version: latestVersion,
          });
          await CapacitorUpdater.set(data);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }

  // Hide splash screen
  SplashScreen.hide();
}

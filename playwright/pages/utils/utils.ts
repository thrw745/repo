export class Utils {
    getRandomString() {
      const randomString = (Math.random() + 1)
        .toString(26)
        .substring(7)
        .toUpperCase();

      return randomString;
    }

}

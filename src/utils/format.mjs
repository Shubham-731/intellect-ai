// Format user data
const formatAuthUser = (user) => ({
  uid: user.uid,
  fullName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  photoUrl: user.photoUrl,
});

// Format firebase messages
const formatFbAuthCode = (code) => {
  if (code) {
    const removedPrefix = code.replace("auth/", "");
    const removedHyphen = removedPrefix.replaceAll("-", " ");
    const capitalised =
      removedHyphen.replace(removedHyphen[0], removedHyphen[0].toUpperCase()) +
      "!";

    return capitalised;
  }
};

export { formatAuthUser, formatFbAuthCode };

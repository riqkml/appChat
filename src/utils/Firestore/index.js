import firestore from '@react-native-firebase/firestore';
export const fireRequest = async (
  collection,
  document,
  subCollection,
  data,
  subDocument,
  type,
) => {
  if (type) {
    const setUrl = await firestore()
      .collection(collection)
      .doc(document)
      .collection(subCollection)
      .doc(subDocument)
      .set(data);
    return setUrl;
  } else {
    const reqUrl = await firestore()
      .collection(collection)
      .doc(document)
      .collection(subCollection)
      .add(data);
    return reqUrl;
  }
};
export const fireUser = async (uid) => {
  return firestore().collection('Users').doc(uid);
};

export const configAPI = {
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAi2M3DSw:APA91bHrglbRNtvyLu9IFEXF0gZC_b5Szbf7FHDuiULULQI_JEmq24FT1bUnJNBw7zkxfnujJKuNHponsL2D58oXkKO9wovgsuPBJnATlrTbHBT04wsCo9AKDUrzldi5xVXmmffhMl_c',
  },
};
export const notificationData = (
  notifTitle,
  notifBody,
  receiverToken,
  dataBody,
  dataTitle,
) => {
  const dataNotif = {
    to: receiverToken,
    collapse_key: 'type_a',
    notification: {
      title: notifTitle,
      body: notifBody,
    },
    data: {
      body: dataBody,
      title: dataTitle,
      key_1: 'Value for key_1',
      key_2: 'Value for key_2',
    },
  };
  return dataNotif;
};

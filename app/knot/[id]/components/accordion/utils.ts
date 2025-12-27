import { capitalize } from "lodash";
export const convertContentKeyToContentText = (key: string) => {
  return capitalize(key);
};

export const formatAccortionData = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      triggerText: convertContentKeyToContentText(item.triggerKey),
    };
  });
};

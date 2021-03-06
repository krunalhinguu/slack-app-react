import * as actionTypes from "./types";
import { types } from "mime-types";

/* USER ACTIONS */
export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};

/* CHANNELS ACTIONS */
export const setCurrentChannel = (channel) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};

export const setPrivateChannel = (isPrivateChannel) => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel: isPrivateChannel,
    },
  };
};

export const setUserPosts = (userPosts) => {
  console.log("actions", userPosts);

  return {
    type: actionTypes.SET_USER_POSTS,
    payload: {
      userPosts,
    },
  };
};

/* COLORS ACTIONS */
export const setColors = (primaryColor, secondaryColor) => {
  console.log(primaryColor, secondaryColor);
  return {
    type: actionTypes.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor,
    },
  };
};

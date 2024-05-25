import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const AuthState = atom({
  key: "AuthState",
  default: { loggedIn: false, data: "" }
})

export const useAuthState = () => useRecoilState(AuthState)

const getCurrentUser = selector({
  key: "getCurrentUser",
  get: ({ get }) => {
    const authState = get(AuthState)
    return authState
  }
})
export const useCurrentUserValue = () => useRecoilValue(getCurrentUser)

const Property = atom({
  key: "Properties",
  default: {
    properties: []
  }
})

const getProperties = selector({
  key: "getProperties",
  get: ({ get }) => {
    const properties = get(Property)
    return properties
  }
})

export const useProperties = () => useRecoilValue(getProperties)

export const usePropertyState = () => useRecoilState(Property)

// const CurrentUser = atom({
//   key: "CurrentUser",
//   default: {
//     user: {}
//   }
// })

// export const useCurrentUser = () => useRecoilValue(CurrentUser)

// export const useCurrentUserState = () => useRecoilState(CurrentUser)
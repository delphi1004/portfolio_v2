import { global } from '../data/global'

const statusInfo = {
  currentMenu: global.menu.idle,
  currentSubMenu: global.menu.idle,
  menuChanged: true,
  subMenuChanged: true,
  showFullScreenGallery: false,
  fullScreenGalleryInfo: {
    info: null,
    initialPageNo: 0
  }
}

export const setCurrentMenu = (id) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_CURRENT_MENU',
        currentMenu : id
      }
    )
  }
}

export const setCurrentSubMenu = (id) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_CURRENT_SUB_MENU',
        currentSubMenu : id
      }
    )
  }
}

export const setShowFullScreenGallery = (show) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_SHOW_FULL_SCREEN_GALLERY',
        showFullScreenGallery : show
      }
    )
  }
}

export const setFullScreenGalleryInfo = (info , initialPageNo) => {
  return dispatch => {
    dispatch(
      {
        type: 'SET_FULL_SCREEN_GALLERY_INFO',
        fullScreenGalleryInfo: {
          info: info,
          initialPageNo: initialPageNo
        }
      }
    )
  }
}

const statusReducer = (state = statusInfo, action) => {

  // console.log('---- current menu', state)
  // console.log('---- current action', action)
  switch (action.type) {
    case 'SET_CURRENT_MENU':
    {
      return {
        ...state, currentMenu: action.currentMenu,
        menuChanged: state.currentMenu !== action.currentMenu ? true : false
      }
    }
    case 'SET_CURRENT_SUB_MENU':
    {
      return {
        ...state, currentSubMenu: action.currentSubMenu,
        subMenuChanged: state.currentSubMenu !== action.currentSubMenu ? true:false
      }
    }
    case 'SET_SHOW_FULL_SCREEN_GALLERY':
    {
      return {
        ...state, showFullScreenGallery: action.showFullScreenGallery,
      }
    }
    case 'SET_FULL_SCREEN_GALLERY_INFO':
    {
      return {
        ...state, fullScreenGalleryInfo: action.fullScreenGalleryInfo,
      }
    }

    default:
  }

  return state
}

export default statusReducer
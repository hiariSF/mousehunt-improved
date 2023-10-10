import { addToGlobal } from './utils';

const main = () => {
  addToGlobal({ mhutils: {
    addStyles,
    onRequest,
    onOverlayChange,
    onOverlayClose,
    onDialogShow,
    onDialogHide,
    onPageChange,
    onTrapChange,
    onEvent,
    onTravel,
    onTravelCallback,
    onNavigation,
    getCurrentPage,
    getCurrentTab,
    getCurrentSubtab,
    matchesCurrentPage,
    isOverlayVisible,
    getCurrentOverlay,
    getCurrentLocation,
    isLoggedIn,
    getSetting,
    saveSetting,
    doRequest,
    isLegacyHUD,
    userHasItem,
    getUserItems,
    getUserSetupDetails,
    addSubmenuItem,
    addItemToGameInfoBar,
    createPopup,
    createImagePopup,
    createMapPopup,
    createWelcomePopup,
    createLarryPopup,
    createPaperPopup,
    showHornMessage,
    toggleHornDom,
    showHuntersHornMessage,
    dismissHuntersHornMessage,
    makeElementDraggable,
    makeDraggableModal,
    makeElement,
    makeButton,
    createChoicePopup,
    createFavoriteButton,
    wait,
    clog,
    debug,
    enableDebugMode,
    run,
    isDarkMode,
  } });
};

export default main;

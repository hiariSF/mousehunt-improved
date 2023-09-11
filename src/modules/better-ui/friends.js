const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const friendsPageChange = (event) => {
  if ('hunterprofile' === getCurrentPage()) {
    return;
  }

  // if there is a 'pagerView-firstPageLink' in the calss, then go to the first page
  if (event.target.classList.contains('pagerView-firstPageLink')) {
    app.pages.FriendsPage.tab_view_friends.pager.showFirstPage(event);
  } else if (event.target.classList.contains('pagerView-previousPageLink')) {
    app.pages.FriendsPage.tab_view_friends.pager.showPreviousPage(event);
  } else if (event.target.classList.contains('pagerView-nextPageLink')) {
    app.pages.FriendsPage.tab_view_friends.pager.showNextPage(event);
  } else if (event.target.classList.contains('pagerView-lastPageLink')) {
    app.pages.FriendsPage.tab_view_friends.pager.showLastPage(event);
  } else {
    return;
  }

  scrollToTop();
};

const scrollToTopOnFriendsPageChange = () => {
  if ('hunterprofile' === getCurrentPage()) {
    return;
  }

  const pagerLinks = document.querySelectorAll('.pagerView-container.PageFriends_view_friends .pagerView-section a');

  // remove all the onclick attributes
  pagerLinks.forEach((link) => {
    link.removeAttribute('onclick');
    link.addEventListener('click', (e) => {
      friendsPageChange(e);
    });
  });
};

const goToFriendsPageOnSearchSelect = () => {
  const friends = document.querySelector('.friendsPage-list-search');
  if (! friends) {
    return;
  }

  friends.addEventListener('change', (e) => {
    setTimeout(() => {
      hg.utils.PageUtil.showHunterProfile(e.val);
    }, 250);
  });
};

const goToFriendPageOnSearchID = (req) => {
  // Make sure we're on the search page.
  if ('community' !== getCurrentSubtab()) {
    return;
  }

  if (! req.friend.sn_user_id) {
    return;
  }

  hg.utils.PageUtil.showHunterProfile(req.friend.sn_user_id);
};

const reorderBlocks = () => {
  if ('friends' !== getCurrentPage()) {
    return;
  }

  const reordered = document.querySelector('.mousehuntHud-page-subTabContent.community');
  if (! reordered || reordered.getAttribute('data-reordered')) {
    return;
  }

  const blocks = document.querySelectorAll('.friendsPage-community-channel');
  if (! blocks || blocks.length < 3) {
    return;
  }

  // Move the third block to the top and make the input bigger.
  const block = blocks[2];
  const parent = block.parentNode;
  parent.removeChild(block);
  parent.insertBefore(block, parent.firstChild);
  block.classList.add('friends-page-id-search');

  const input = block.querySelector('input');
  if (input) {
    // disable the 1password icon
    input.setAttribute('data-1p-ignore', 'true');
  }

  reordered.setAttribute('data-reordered', 'true');
};

const autofocusIdSearch = () => {
  console.log('autofocusIdSearch');
  const input = document.querySelector('.friendsPage-community-hunterIdForm-input');
  if (! input) {
    return;
  }

  input.focus();
};

const refreshOnFriendPageChange = () => {
  if ('hunterprofile' !== getCurrentPage() || 'location' !== getCurrentSubtab()) {
    return;
  }

  const subtabContents = document.querySelectorAll('.mousehuntHud-page-subTabContent');
  if (! subtabContents) {
    return;
  }

  // loop through subtab contents and if any of them are different than our hunter id, then refresh the page
  subtabContents.forEach((content) => {
    if (content.getAttribute('data-user-id') != user.user_id) { // eslint-disable-line eqeqeq
      window.location.reload();
    }
  });
};

const listenForIDPaste = () => {
  // listen for the user hitting the paste shortcut
  window.addEventListener('keydown', (e) => {
    // listen for command + v as well as ctrl + v
    if ((e.metaKey || e.ctrlKey) && 86 === e.keyCode) {
      navigator.clipboard.readText().then((text) => {
        // if it is a number, then go to the hunter profile page
        if (! /^\d+$/.test(text)) {
          return;
        }

        hg.utils.PageUtil.setPage('HunterProfile', {
          id: text,
        });
      });
    }
  });
};

export default () => {
  onRequest(goToFriendPageOnSearchID, 'managers/ajax/pages/friends.php');

  onNavigation(() => {
    scrollToTopOnFriendsPageChange();
    goToFriendsPageOnSearchSelect();
    reorderBlocks();
  }, {
    page: 'friends'
  });

  onNavigation(reorderBlocks, {
    page: 'friends'
  });

  onNavigation(autofocusIdSearch, {
    page: 'friends',
    tab: 'requests',
    subtab: 'community',
  });

  onNavigation(refreshOnFriendPageChange, {
    page: 'hunterprofile',
    tab: 'mice',
    subtab: 'location',
    onLoad: false,
  });

  listenForIDPaste();
};

import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { historyReplace } from '@shopgate/pwa-common/actions/router';
import { PATH_INTRO_VIDEO } from '../constants';
import { texts, videoSrc, enabled } from '../config';

/**
 * Intro video subscriptions
 * @param {Function} subscribe The subscribe function
 */
export default function introVideo(subscribe) {
  if (!enabled || (!videoSrc.webm || !videoSrc.mp4)) {
    return;
  }

  const LOCAL_STORAGE_KEY = '@shopgate-project/intro-video.presented';

  subscribe(appDidStart$, async ({ dispatch }) => {
    // show the modal if it wasn't shown before
    const showModel = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) === null;

    if (!showModel) {
      return;
    }

    window.localStorage.setItem(LOCAL_STORAGE_KEY, true);
    const skipIt = await dispatch(showModal({
      title: texts.title,
      message: texts.message,
      // swap confirm and dismiss here because of special Client request for button order
      confirm: texts.dismiss,
      dismiss: texts.confirm,
    }));

    if (skipIt) {
      return;
    }

    dispatch(historyReplace({
      pathname: PATH_INTRO_VIDEO,
    }));
  });
}

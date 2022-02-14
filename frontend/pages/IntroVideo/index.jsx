import React from 'react';
import { css } from 'glamor';
import { useTheme } from '@shopgate/engage/core';
import { themeConfig } from '@shopgate/engage';
import { Route } from '@shopgate/engage/components';
import { PATH_INTRO_VIDEO } from '../../constants';
import { videoSrc, texts } from '../../config';

const { variables } = themeConfig;

export const HEADER_HEIGHT = variables.navbar.height;

const styles = {
  video: css({
    width: '100vw',
    height: `calc(100vh - var(--tabbar-height) - var(--safe-area-inset-bottom) - var(--safe-area-inset-top) - ${HEADER_HEIGHT}px)`,
    objectFit: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  }).toString(),
};

/**
 * @returns {JSX}
 */
const ItcLoginPage = () => {
  const { View, AppBar } = useTheme();

  return (
    <View>
      <AppBar title={texts.title} />
      <div className={styles.page}>
        <video className={styles.video} playsInline controls autoPlay muted loop poster={videoSrc.cover}>
          <source type="video/mp4" src={videoSrc.mp4} />
          <source type="video/webm" src={videoSrc.cover} />
        </video>
      </div>
    </View>
  );
};

export default () => (
  <Route
    pattern={PATH_INTRO_VIDEO}
    component={ItcLoginPage}
  />
);

import React, { Component } from 'react';
import { Clipboard } from 'react-native';
import Share, { ShareSheet } from 'react-native-share';
import { darkTheme } from '../styles';
import ShareItem from './ShareItem';
import { DropDownManager } from '../utils/DropDownManager';

export default class ShareStory extends Component {
  onCancel = () => {
    this.props.showShareModal(this.props.navigation);
  };

  shareSocialMedia = (shareOptions, social) => {
    this.onCancel();
    setTimeout(() => {
      Share.shareSingle(Object.assign(shareOptions, { social }));
    }, 300);
  };

  shareOpenMore = shareOptions => {
    this.onCancel();
    setTimeout(() => {
      Share.open(shareOptions).catch(() => {});
    }, 300);
  };

  shareCopyLink = shareOptions => {
    this.onCancel();
    setTimeout(() => {
      if (typeof shareOptions['url'] !== undefined) {
        Clipboard.setString(shareOptions['url']);
        DropDownManager.getDropDown().alertWithType(
          'custom',
          'Copied Link URL',
          ''
        );
      }
    }, 300);
  };

  render() {
    const { story } = this.props;
    let shareOptions = {
      title: story.title,
      subject: `Hacker News: ${story.title}`,
      message: `"${story.title}" via HackerNewsReader for iOS & Android`,
      url: `https://news.ycombinator.com/item?id=${story.id}`
    };

    const { isSharing } = this.props.navigation.state.params;

    return (
      <ShareSheet visible={isSharing} onCancel={this.onCancel}>
        <ShareItem
          onPress={_ => this.shareSocialMedia(shareOptions, 'twitter')}
          name={'Twitter'}
          icon={'twitter'}
          color={darkTheme.twitter}
        />
        <ShareItem
          onPress={_ => this.shareSocialMedia(shareOptions, 'facebook')}
          name={'Facebook'}
          icon={'facebook'}
          color={darkTheme.facebook}
        />
        <ShareItem
          onPress={_ => this.shareSocialMedia(shareOptions, 'whatsapp')}
          name={'WhatsApp'}
          icon={'whatsapp'}
          color={darkTheme.whatsapp}
        />
        <ShareItem
          onPress={_ => this.shareSocialMedia(shareOptions, 'googleplus')}
          name={'Google +'}
          icon={'google-plus'}
          color={darkTheme.googleplus}
        />
        <ShareItem
          onPress={_ => this.shareSocialMedia(shareOptions, 'email')}
          name={'Email'}
          icon={'envelope-o'}
          color={darkTheme.email}
        />
        <ShareItem
          onPress={_ => this.shareCopyLink(shareOptions)}
          name={'Copy Link'}
          icon={'link'}
          color={darkTheme.copylink}
        />
        <ShareItem
          onPress={_ => this.shareOpenMore(shareOptions)}
          name={'More'}
          icon={'ellipsis-h'}
          color={darkTheme.email}
        />
      </ShareSheet>
    );
  }
}

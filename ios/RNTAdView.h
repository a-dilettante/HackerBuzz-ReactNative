//
//  RNTAdView.h
//  HackerNewsReader
//
//  Created by Rafal Ciesielczuk on 24/08/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTView.h>
#import <React/RCTComponent.h>
#import <UIKit/UIKit.h>
#import "StoryListAd.h"
#import <FBAudienceNetwork/FBAudienceNetwork.h>

@interface RNTAdView : RCTView <StoryListAdDeletage>

@property (nonatomic, strong) StoryListAd *storyListAd;
@property (nonatomic, copy) RCTDirectEventBlock onAdLoaded;

@end

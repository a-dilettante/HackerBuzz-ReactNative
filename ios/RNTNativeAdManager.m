//
//  RNTNativeAdManager.m
//  HackerNewsReader
//
//  Created by Rafal Ciesielczuk on 24/08/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTNativeAdManager.h"
#import "RNTAdView.h"
#import "StoryListAd.h"

@implementation RNTNativeAdManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTDirectEventBlock)

- (instancetype)init {
  self = [super init];
  return self;
}

- (UIView *)view
{
  return [RNTAdView new];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end

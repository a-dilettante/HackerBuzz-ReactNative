//
//  RNTAdView.m
//  HackerNewsReader
//
//  Created by Rafal Ciesielczuk on 24/08/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTAdView.h"

@implementation RNTAdView

- (instancetype)init
{
  self = [super init];
  if (self) {
    [self initializeSubviews];
  }
  return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
}

- (void)initializeSubviews {
  CGFloat width = [UIScreen mainScreen].bounds.size.width;
  CGRect frame = CGRectMake(0, 0, width, 100);
  
  self.storyListAd = [[StoryListAd alloc] init];
  self.storyListAd.frame = frame;
  self.storyListAd.delegate = self;
  self.storyListAd.hidden = YES;
  [self addSubview:self.storyListAd];
}

- (void)storyListAdDidLoad:(FBNativeAd *)ad
{
  _onAdLoaded(@{@"didLoad": @YES});
}

@end

//
//  StoryListAd.m
//  HackerNewsReader
//
//  Created by Rafal Ciesielczuk on 20/09/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "StoryListAd.h"
#import "Masonry.h"

#define UIColorFromRGB(rgbValue) \
[UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0x00FF00) >>  8))/255.0 \
blue:((float)((rgbValue & 0x0000FF) >>  0))/255.0 \
alpha:1.0]

@interface StoryListAd () <FBNativeAdDelegate>

@end

@implementation StoryListAd

static NSString * const kFacebookAdPlacementId = @"PLACEMENT_ID";

- (instancetype)init
{
  self = [super init];
  if (self) {
    [self initializeSubviews];
    [self fetchAd];

  }
  return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  [self.adChoicesView updateFrameFromSuperview:UIRectCornerBottomRight];
}

- (void)fetchAd
{
  self.nativeAd = [[FBNativeAd alloc] initWithPlacementID:kFacebookAdPlacementId];
  self.nativeAd.delegate = self;
  self.nativeAd.mediaCachePolicy = FBNativeAdsCachePolicyAll;
  [self.nativeAd loadAd];
}

- (void)nativeAdDidLoad:(FBNativeAd *)nativeAd
{
  if (self.nativeAd) {
    [self.nativeAd unregisterView];
  }
  
  self.nativeAd = nativeAd;
  
  __weak typeof(self) weakSelf = self;
  [self.nativeAd.icon loadImageAsyncWithBlock:^(UIImage *image) {
    __strong typeof(self) strongSelf = weakSelf;
    strongSelf.adIconImageView.image = image;
  }];
  
  self.adTitleLabel.text = self.nativeAd.title;
  self.adSubtitleLabel.text = self.nativeAd.subtitle;
  [self.adCallToActionButton setTitle:self.nativeAd.callToAction
                                         forState:UIControlStateNormal];
  
  self.adChoicesView.nativeAd = nativeAd;
  self.adChoicesView.corner = UIRectCornerBottomLeft;
  self.adChoicesView.backgroundShown = YES;
  
  NSArray *clickableViews = [[NSArray alloc] initWithObjects:self.adTitleLabel, self.adSubtitleLabel, self.sponsoredLabel, self.adIconImageView, self.adCallToActionButton, nil];
  
  [nativeAd registerViewForInteraction:self withViewController:nil withClickableViews:clickableViews];
  self.hidden = NO;
  [self.delegate storyListAdDidLoad:nativeAd];
}

- (void)nativeAdDidClick:(FBNativeAd *)nativeAd
{
  NSLog(@"Native ad %@, was clicked.", nativeAd);
}

- (void)nativeAdDidFinishHandlingClick:(FBNativeAd *)nativeAd
{
  NSLog(@"Native ad %@, did finish click handling.", nativeAd);
}

- (void)nativeAdWillLogImpression:(FBNativeAd *)nativeAd
{
  NSLog(@"Native ad %@, impression is being captured.", nativeAd);
}

- (void)nativeAd:(FBNativeAd *)nativeAd didFailWithError:(NSError *)error
{
  NSLog(@"Native ad failed to load with error: %@", error);
}


- (void)initializeSubviews
{
  self.adIconImageView = [[UIImageView alloc] init];
  [self addSubview:self.adIconImageView];
  
  self.adTitleLabel = [[UILabel alloc] init];
  self.adTitleLabel.numberOfLines = 2;
  self.adTitleLabel.lineBreakMode = NSLineBreakByWordWrapping;
  self.adTitleLabel.font = [UIFont systemFontOfSize:16.0];
  self.adTitleLabel.textColor = UIColorFromRGB(0x61AFEF);
  [self addSubview:self.adTitleLabel];
  
  self.adSubtitleLabel = [[UILabel alloc] init];
  self.adSubtitleLabel.numberOfLines = 2;
  self.adSubtitleLabel.lineBreakMode = NSLineBreakByWordWrapping;
  self.adSubtitleLabel.font = [UIFont systemFontOfSize:12.0];
  self.adSubtitleLabel.textColor = UIColorFromRGB(0xE5C07B);
  [self addSubview:self.adSubtitleLabel];
  
  self.sponsoredLabel = [[UILabel alloc] init];
  self.sponsoredLabel.layer.masksToBounds = YES;
  self.sponsoredLabel.layer.cornerRadius = 4.0;
  self.sponsoredLabel.text = @"AD";
  self.sponsoredLabel.font = [UIFont boldSystemFontOfSize:8.0];
  self.sponsoredLabel.textColor = UIColorFromRGB(0xABB2BF);
  self.sponsoredLabel.backgroundColor = UIColorFromRGB(0x333333);
  [self.sponsoredLabel setTextAlignment:NSTextAlignmentCenter];
  [self addSubview:self.sponsoredLabel];
  
  self.adChoicesView = [[FBAdChoicesView alloc] init];
  [self addSubview:self.adChoicesView];
  
  self.adCallToActionButton = [UIButton buttonWithType:UIButtonTypeSystem];
  [self.adCallToActionButton setTitleColor:UIColorFromRGB(0xABB2BF) forState:UIControlStateNormal];
  self.adCallToActionButton.titleLabel.font = [UIFont systemFontOfSize:12.0];
  self.adCallToActionButton.contentEdgeInsets = UIEdgeInsetsMake(5, 10, 5, 10);
  [self.adCallToActionButton.titleLabel setTextAlignment:NSTextAlignmentCenter];
  self.adCallToActionButton.titleLabel.adjustsFontSizeToFitWidth = YES;
  self.adCallToActionButton.layer.masksToBounds = YES;
  self.adCallToActionButton.layer.borderWidth = 1.0f;
  self.adCallToActionButton.layer.cornerRadius = 4.0f;
  self.adCallToActionButton.layer.borderColor = UIColorFromRGB(0xABB2BF).CGColor;
  [self addSubview:self.adCallToActionButton];
  
  int padding = 5;
  
  [self.adIconImageView makeConstraints:^(MASConstraintMaker *make) {
    make.width.equalTo(@90);
    make.height.equalTo(@90);
    make.top.greaterThanOrEqualTo(self.top).offset(padding);
    make.left.equalTo(self.left).offset(padding);
    make.bottom.equalTo(self.adChoicesView.top).offset(-padding);
    make.right.equalTo(self.adTitleLabel.left).offset(-padding);
  }];
  
  [self.adTitleLabel makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.top).offset(padding);
    make.bottom.equalTo(self.adSubtitleLabel.top).offset(-padding);
    make.left.equalTo(self.adIconImageView.right).offset(padding);
    make.right.equalTo(self.sponsoredLabel.left).offset(-padding);
  }];
  
  [self.adSubtitleLabel makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.adTitleLabel.bottom).offset(10);
    make.left.equalTo(self.adIconImageView.right).offset(padding);
    make.right.equalTo(self.right).offset(padding);
  }];
  
  [self.adChoicesView makeConstraints:^(MASConstraintMaker *make) {
    make.left.equalTo(self.adTitleLabel.left);
    make.width.equalTo(@100);
    make.height.equalTo(@20);
  }];
  
  [self.sponsoredLabel makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.top).with.offset(padding);
    make.right.equalTo(self.right).offset(-padding);
    make.left.equalTo(self.adTitleLabel.right).offset(padding);
    make.width.equalTo(@30);
    make.height.equalTo(@20);
  }];
  
  [self.adCallToActionButton makeConstraints:^(MASConstraintMaker *make) {
    make.bottom.equalTo(self.bottom).offset(-padding);
    make.left.equalTo(self.adIconImageView.right).offset(padding);
    make.width.equalTo(@85);
  }];
}



@end

//
//  StoryListAd.h
//  HackerNewsReader
//
//  Created by Rafal Ciesielczuk on 20/09/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FBAudienceNetwork/FBAudienceNetwork.h>

@protocol StoryListAdDeletage
- (void)storyListAdDidLoad:(FBNativeAd *)ad;
@end

@interface StoryListAd : UIView

@property (strong, nonatomic) FBNativeAd *nativeAd;

@property (strong, nonatomic)  UILabel *adTitleLabel;
@property (strong, nonatomic)  UILabel *adSubtitleLabel;
@property (strong, nonatomic)  UIImageView *adIconImageView;
@property (strong, nonatomic)  UIButton *adCallToActionButton;
@property (strong, nonatomic)  UILabel *sponsoredLabel;
@property (strong, nonatomic)  FBAdChoicesView *adChoicesView;

@property (weak) id<StoryListAdDeletage> delegate;

@end

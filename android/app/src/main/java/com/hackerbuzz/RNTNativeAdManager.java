package com.hackerbuzz;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.facebook.ads.Ad;
import com.facebook.ads.AdChoicesView;
import com.facebook.ads.AdError;
import com.facebook.ads.AdListener;
import com.facebook.ads.NativeAd;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by rafi on 30/08/2017.
 */

public class RNTNativeAdManager extends SimpleViewManager<View> {

  private LinearLayout adView;
  private NativeAd nativeAd;

  private static final String PLACEMENT_ID = "PLACEMENT_ID";
  private static final String ON_AD_LOADED = "onAdLoaded";
  private static final String REACT_CLASS = "RNTNativeAd";
  private ThemedReactContext reactContext;

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected View createViewInstance(ThemedReactContext reactContext) {
    this.reactContext = reactContext;

    LayoutInflater inflater = LayoutInflater.from(reactContext.getBaseContext());
    showNativeAd(reactContext.getBaseContext());

    return adView = (LinearLayout) inflater.inflate(R.layout.native_ad_layout, null);
  }

  private void showNativeAd(final Context context) {
    nativeAd = new NativeAd(context, PLACEMENT_ID);

    nativeAd.setAdListener(new AdListener() {

      @Override
      public void onError(Ad ad, AdError error) {
        Log.i("advertisements", error.getErrorMessage() + " " + error.getErrorCode());
      }

      @Override
      public void onAdLoaded(Ad ad) {
        if (nativeAd != null) {
          nativeAd.unregisterView();
        }

        ImageView nativeAdIcon = adView.findViewById(R.id.native_ad_icon);
        TextView nativeAdTitle = adView.findViewById(R.id.native_ad_title);
        TextView nativeAdSubtitle = adView.findViewById(R.id.native_ad_subtitle);
        Button nativeAdCallToAction = adView.findViewById(R.id.native_ad_call_to_action);

        nativeAdSubtitle.setText(nativeAd.getAdSubtitle());
        nativeAdTitle.setText(nativeAd.getAdTitle());
        nativeAdCallToAction.setText(nativeAd.getAdCallToAction());

        NativeAd.Image adIcon = nativeAd.getAdIcon();
        NativeAd.downloadAndDisplayImage(adIcon, nativeAdIcon);

        RelativeLayout adChoicesContainer = adView.findViewById(R.id.ad_choices_container);
        AdChoicesView adChoicesView = new AdChoicesView(reactContext, nativeAd, true);
        adChoicesContainer.addView(adChoicesView);

        List<View> clickableViews = new ArrayList<>();
        clickableViews.add(nativeAdTitle);
        clickableViews.add(nativeAdSubtitle);
        clickableViews.add(nativeAdIcon);
        clickableViews.add(nativeAdCallToAction);
        nativeAd.registerViewForInteraction(adView, clickableViews);

        notifyOnAdLoaded();
      }

      @Override
      public void onAdClicked(Ad ad) {
      }

      @Override
      public void onLoggingImpression(Ad ad) {
      }
    });

    nativeAd.loadAd();
  }

  private void notifyOnAdLoaded() {
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(ON_AD_LOADED, null);
  }
}
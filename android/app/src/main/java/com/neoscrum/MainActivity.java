package com.neoscrum;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // add this


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override                                             // add this
  protected void onCreate(Bundle savedInstanceState) {  // add this
    SplashScreen.show(this);                            // add this
    super.onCreate(savedInstanceState);                 // add this
  } 
  @Override
  protected String getMainComponentName() {
    return "NeoScrum";
  }
}

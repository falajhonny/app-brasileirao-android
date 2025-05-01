package com.brasileiraoseriebapp.br

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val webView = WebView(this)
        webView.webViewClient = WebViewClient()

        // Habilitar JavaScript
        webView.settings.javaScriptEnabled = true

        // Carrega seu site
        webView.loadUrl("http://localhost:3000") // <-- Ajuste para seu IP

        setContentView(webView)
    }
}
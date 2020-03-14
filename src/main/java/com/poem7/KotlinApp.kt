package com.poem7

import com.poem7.model.KeyListener
import com.poem7.model.MouseListener
import com.poem7.model.MouseMotionListener
import com.poem7.model.MouseWheelListener
import org.jnativehook.GlobalScreen
import org.jnativehook.NativeHookException
import java.util.logging.Level
import java.util.logging.Logger

class KotlinApp {
    fun hello() {
        GlobalScreen.addNativeMouseListener(MouseListener())
        GlobalScreen.addNativeKeyListener(KeyListener())
        GlobalScreen.addNativeMouseWheelListener(MouseWheelListener())
        GlobalScreen.addNativeMouseMotionListener(MouseMotionListener())
        val logger: Logger = Logger.getLogger(GlobalScreen::class.java.getPackage().name)
        logger.level = Level.WARNING

// Don't forget to disable the parent handlers.

// Don't forget to disable the parent handlers.
        logger.setUseParentHandlers(false)
        try {
            GlobalScreen.registerNativeHook()
        } catch (e: NativeHookException) {

        }
/*
        GlobalScreen.addNativeKeyListener(KeyListener())

        // val demo = Demo()
        var i = 0
        while (i < 1000000) {
            GlobalScreen.postNativeEvent(NativeInputEvent(GlobalScreen::class.java,NativeKeyEvent.VC_B, 0))
            i++
        }
        // val listener = GlobalKeyListenerExample()

 */
        println("Kotlin")
    }
}
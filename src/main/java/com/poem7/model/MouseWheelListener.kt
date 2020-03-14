package com.poem7.model

import org.jnativehook.mouse.NativeMouseWheelEvent
import org.jnativehook.mouse.NativeMouseWheelListener

class MouseWheelListener: NativeMouseWheelListener {
    override fun nativeMouseWheelMoved(p0: NativeMouseWheelEvent?) {
        println("mouse wheel moved")
    }
}
package com.poem7.model

import org.jnativehook.mouse.NativeMouseEvent
import org.jnativehook.mouse.NativeMouseMotionListener

class MouseMotionListener: NativeMouseMotionListener {
    override fun nativeMouseMoved(p0: NativeMouseEvent?) {
        println("mouse moved")
    }

    override fun nativeMouseDragged(p0: NativeMouseEvent?) {
        println("mouse dragged")
    }
}
import React from 'react'
import './Spinner.scss'

export function Spinner() {
    return (
            <div class="sk-folding-cube">
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
    )
}

export function Spinner2() {
    return (
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    )
}

export function Spinner3() {
    return (
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
}



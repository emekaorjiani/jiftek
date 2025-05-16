import * as React from "react"

import { cn } from "@/lib/utils"

function Table({
    className,
    ...props
    }: React.ComponentProps<"table">) {
}

function TableBody({
    className,
    ...props
    }: React.ComponentProps<"tbody">) {
}

function TableCell({
    className,
    ...props
    }: React.ComponentProps<"th">) {
}

function TableHead({
    className,
    ...props
    }: React.ComponentProps<"tbody">) {
}

function TableHeader({
    className,
    ...props
    }: React.ComponentProps<"thead">) {
}

function TableRow({
    className,
    ...props
    }: React.ComponentProps<"tr">) {
}

export {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow}
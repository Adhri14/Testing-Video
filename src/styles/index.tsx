import type { PropsWithChildren } from "react";
import React from "react";
import { FlexAlignType, Platform, View, ViewStyle } from "react-native";
import Styled from "styled-components";

// type ContainerTypes = {
//     flex?: number;
//     height?: number | string;
//     width?: number | string;
//     radius?: number;
//     color?: string;
//     align?: FlexAlignType;
//     justify?: 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'flex-start' | 'flex-end';
//     opacity?: number;
//     paddingVertical?: number;
//     paddingHorizontal?: number;
//     paddingTop?: number;
//     paddingBottom?: number;
//     paddingLeft?: number;
//     paddingRight?: number;
//     padding?: number;
//     margin?: number;
//     marginHorizontal?: number;
//     marginVertical?: number;
//     marginLeft?: number;
//     marginRight?: number;
//     marginTop?: number;
//     marginBottom?: number;
//     style?: ViewStyle;
// }

interface ContainerTypes extends PropsWithChildren {
    flex?: number;
    height?: number | string;
    width?: number | string;
    radius?: number;
    color?: string;
    align?: FlexAlignType;
    justify?: 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'flex-start' | 'flex-end';
    opacity?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    padding?: number;
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    style?: ViewStyle;
}

function Container(props: Partial<ContainerTypes>): JSX.Element {
    return <View style={[
        { flex: props.flex },
        { height: props.height },
        { width: props.width },
        { borderRadius: props.radius },
        { backgroundColor: props.color },
        { alignItems: props.align },
        { justifyContent: props.justify },
        { opacity: props.opacity },
        { padding: props.padding },
        { paddingVertical: props.paddingVertical },
        { paddingHorizontal: props.paddingHorizontal },
        { paddingTop: props.paddingTop },
        { paddingRight: props.paddingRight },
        { paddingBottom: props.paddingBottom },
        { paddingLeft: props.paddingLeft },
        { margin: props.margin },
        { marginHorizontal: props.marginHorizontal },
        { marginVertical: props.marginVertical },
        { marginTop: props.marginTop },
        { marginRight: props.marginRight },
        { marginBottom: props.marginBottom },
        { marginLeft: props.marginLeft },
        { ...props.style },
    ]}>{props.children}</View>
}

// ==================== Shadow ====================
const StyleShadow =
    Platform.OS === "ios"
        ? Styled(View)`
        shadowOpacity: 0.1;
        shadowRadius: 2px;
        shadowColor: #000000;
        shadowOffset: 0px 4px;
    `
        : Styled(View)`
        elevation: 2;
    `;

type ShadowProps = {
    style?: ViewStyle;
}

const Shadow = (props: PropsWithChildren<ShadowProps>) => <StyleShadow style={props.style}>{props.children}</StyleShadow>
// ==================== Card ====================
type CardProps = {
    color?: string;
    radius?: string | number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    padding?: number;
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    height?: number | string;
    style?: ViewStyle;
}
const StyledCard = Styled(View)`
    backgroundColor: ${(props: CardProps) => props.color || "#FFFFFF"};
    borderRadius: ${(props: CardProps) =>
        typeof props.radius === "string"
            ? props.radius
            : props.radius
                ? props.radius + "px"
                : "0px"};
    padding: ${(props: CardProps) =>
        `${props.padding || props.paddingVertical || props.paddingTop || 0}px ${props.padding || props.paddingHorizontal || props.paddingRight || 0
        }px ${props.padding || props.paddingVertical || props.paddingBottom || 0
        }px ${props.padding || props.paddingHorizontal || props.paddingLeft || 0
        }px`};
    margin: ${(props: CardProps) =>
        `${props.margin || props.marginVertical || props.marginTop || 0}px ${props.margin || props.marginHorizontal || props.marginRight || 0
        }px ${props.margin || props.marginVertical || props.marginBottom || 0
        }px ${props.margin || props.marginHorizontal || props.marginLeft || 0
        }px`};
        height: ${(props: CardProps) => props.height || 0}px
`;

const Card = (props: PropsWithChildren<CardProps>): JSX.Element => {
    return <StyledCard style={props.style}>
        {props.children}
    </StyledCard>
};

// ==================== Divider ====================
type DividerProps = {
    height?: number | string;
    width?: number | string;
}
const StyledDivider = Styled(View)`
    height: ${(props: DividerProps) => props.height || 16}px;
    width: ${(props: DividerProps) => props.width || 16}px;
`;
const Divider = (props: DividerProps) => <StyledDivider {...props} />;
// ==================== Padding ====================
type PaddingPropsStyle = {
    color?: string;
    radius?: number;
    t?: number;
    r?: number;
    b?: number;
    l?: number;
}

type PaddingProps = {
    color?: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    radius?: number;
    style?: ViewStyle;
    padding?: number;
    vertical?: number;
    horizontal?: number;
}
const SPadding = Styled(View)`
    backgroundColor: ${(props: PaddingPropsStyle) => props.color};
    borderRadius: ${(props: PaddingPropsStyle) => props.radius}px;
    paddingTop: ${(props: PaddingPropsStyle) => `${props.t}px`};
    paddingRight: ${(props: PaddingPropsStyle) => `${props.r}px`};
    paddingBottom: ${(props: PaddingPropsStyle) => `${props.b}px`};
    paddingLeft: ${(props: PaddingPropsStyle) => `${props.l}px`};
`;
const Padding = (props: PropsWithChildren<PaddingProps>): JSX.Element => {
    return (
        <SPadding
            color={props.color || "transparent"}
            radius={props.radius || 0}
            t={props.top || props.padding || props.vertical || 0}
            r={props.right || props.padding || props.horizontal || 0}
            b={props.bottom || props.padding || props.vertical || 0}
            l={props.left || props.padding || props.horizontal || 0}
            {...props.style}>
            {props.children}
        </SPadding>
    );
};

// ==================== Row ====================
type RowProps = {
    align?: FlexAlignType;
    justify?: 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'flex-start' | 'flex-end';
    color?: string;
    style?: ViewStyle;
}
const SRow = Styled(View)`
    flexDirection: row;
    alignItems: ${(props: RowProps) => props.align || "center"};
    justifyContent: ${(props: RowProps) => props.justify || "flex-start"};
    backgroundColor: ${(props: RowProps) => props.color || "transparent"};
`;
const Row = (props: PropsWithChildren<RowProps>): JSX.Element => <SRow {...props} style={props.style}>{props.children}</SRow>;

// ==================== Column ====================
type ColumnProps = {
    align?: FlexAlignType;
    justify?: 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'flex-start' | 'flex-end';
    color?: string;
    style?: ViewStyle;
}
const SColumn = Styled(View)`
    flexDirection: column;
    alignItems: ${(props: ColumnProps) => props.align || "flex-start"};
    justifyContent: ${(props: ColumnProps) => props.justify || "flex-start"};
    backgroundColor: ${(props: ColumnProps) => props.color || "transparent"};
`;
const Column = (props: PropsWithChildren<ColumnProps>) => <SColumn {...props} style={props.style}>{props.children}</SColumn>;

// ==================== Circle ====================
type CircleProps = {
    color?: string;
    size?: number;
    borderColor?: string;
    borderWidth?: string;
    style?: ViewStyle;
}
const SCircle = Styled(View)`
    minHeight: ${(props: CircleProps) => props.size || 8}px;
    minWidth: ${(props: CircleProps) => props.size || 8}px;
    borderRadius: ${(props: CircleProps) => (props.size || 8) / 2}px;
    backgroundColor: ${(props: CircleProps) => props.color || "transparent"};
    borderColor: ${(props: CircleProps) => props.borderColor || "transparent"};
    borderWidth: ${(props: CircleProps) => props.borderWidth || 0}px;
    alignItems: center;
    justifyContent: center;
`;
const Circle = (props: PropsWithChildren<CircleProps>) => <SCircle {...props} style={props.style}>{props.children}</SCircle>;

// ==================== Line ====================
type LineProps = {
    color?: string;
    height?: number | string;
    width?: number | string;
    radius?: number;
    style?: ViewStyle;
}
const SLine = Styled(View)`
    height: ${(props: LineProps) =>
        typeof props.height === "string"
            ? props.height
            : props.height
                ? props.height + "px"
                : "2px"};
    width: ${(props: LineProps) =>
        typeof props.width === "string"
            ? props.width
            : props.width
                ? props.width + "px"
                : "2px"};
    borderRadius: ${(props: LineProps) => props.radius || 0}px;
    backgroundColor: ${(props: LineProps) => props.color || "transparent"};
    alignSelf: center;
`;
const Line = (props: PropsWithChildren<LineProps>) => <SLine {...props} style={props.style}>{props.children}</SLine>;

// ==================== Box ====================
type BoxProps = {
    size?: number | string,
    radius?: number | string,
    color?: string,
    style?: ViewStyle,
}
const SBox = Styled(View)`
    minHeight: ${(props: BoxProps) =>
        typeof props.size === "string"
            ? props.size
            : props.size
                ? props.size + "px"
                : "2px"};
    minWidth: ${(props: BoxProps) =>
        typeof props.size === "string"
            ? props.size
            : props.size
                ? props.size + "px"
                : "2px"};
    borderRadius: ${(props: BoxProps) =>
        typeof props.radius === "string"
            ? props.radius
            : props.radius
                ? props.radius + "px"
                : "0px"};
    backgroundColor: ${(props: BoxProps) => props.color || "transparent"};
    alignSelf: center;
    alignItems: center;
    justifyContent: center;
`;
const Box = (props: PropsWithChildren<BoxProps>) => <SBox {...props} style={props.style}>{props.children}</SBox>

export {
    Container,
    Shadow,
    Card,
    Divider,
    Padding,
    Row,
    Column,
    Circle,
    Line,
    Box
};
interface BrushIconProps extends React.SVGProps<SVGSVGElement> {
  color: string;
  selected?: boolean;
}
export function BrushIcon({
  color,
  selected = false,
  ...rest
}: BrushIconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M24.8905 6.05297C20.1398 4.78004 14.3854 6.33189 10.8955 10.9368C7.87511 15.137 7.56729 20.7676 10.1263 25.3026C13.0011 30.282 14.4456 34.7872 14.387 36.6634L14.273 40.2805L17.5281 38.6995C18.3259 38.3129 19.1448 37.8772 19.9716 37.3999C26.0569 33.8865 32.5976 28.0731 34.4807 22.0781C36.3002 16.1338 32.2222 8.01738 24.8905 6.05297Z"
        fill={color}
        stroke={selected ? 'white' : undefined}
        strokeWidth={2}
      />
    </svg>
  );
}

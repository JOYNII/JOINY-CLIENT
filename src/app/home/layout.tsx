// src/app/home/layout.tsx

export default function HomeNestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 이 레이아웃에만 필요한 추가적인 래퍼나 스타일이 있다면 여기에 넣습니다. */}
      {children}
    </>
  );
}
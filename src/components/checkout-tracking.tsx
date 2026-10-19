import Script from "next/script";

/** Marca o clique no checkout (pixel da Meta). Os parâmetros da URL vão em PassUtmToCheckout. */
export function CheckoutTracking() {
  return (
    <Script id="eduzz-checkout" strategy="afterInteractive">
      {`document.querySelectorAll('a[href*="eduzz"]').forEach(function(btn){
  btn.addEventListener('click', function(){
    fbq('trackCustom', 'CliqueCheckout');
  });
});`}
    </Script>
  );
}

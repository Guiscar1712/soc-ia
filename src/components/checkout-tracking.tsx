import Script from "next/script";

/** Marca o clique no checkout (pixel da Meta) e repassa os parâmetros da URL (UTMs) para a Eduzz. */
export function CheckoutTracking() {
  return (
    <Script id="eduzz-checkout" strategy="afterInteractive">
      {`document.querySelectorAll('a[href*="eduzz"]').forEach(function(btn){
  btn.addEventListener('click', function(){
    fbq('trackCustom', 'CliqueCheckout');
  });
  var q = window.location.search;
  if (q) btn.href += (btn.href.includes('?') ? '&' : '?') + q.substring(1);
});`}
    </Script>
  );
}

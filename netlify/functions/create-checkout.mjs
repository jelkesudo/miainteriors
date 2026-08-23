const PRODUCT_ENV_MAP = {
  MIA_PRODUCT_PLANNER: 'LS_VARIANT_PLANNER',
  MIA_PRODUCT_MOODBOARD: 'LS_VARIANT_MOODBOARD',
  MIA_PRODUCT_CHECKLIST: 'LS_VARIANT_CHECKLIST',
};

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { productKey } = await request.json();
    const envName = PRODUCT_ENV_MAP[productKey];

    if (!envName) {
      return new Response(JSON.stringify({ error: 'Unknown product' }), { status: 400 });
    }

    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env[envName];

    if (!apiKey || !storeId || !variantId) {
      return new Response(JSON.stringify({ error: 'Checkout is not configured' }), { status: 503 });
    }

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_options: {
              embed: false,
              media: true,
              logo: true,
            },
            product_options: {
              redirect_url: `${new URL(request.url).origin}/vodici?success=1`
            }
          },
          relationships: {
            store: { data: { type: 'stores', id: String(storeId) } },
            variant: { data: { type: 'variants', id: String(variantId) } }
          }
        }
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      console.error('Lemon Squeezy error', payload);
      return new Response(JSON.stringify({ error: 'Checkout provider error' }), { status: 502 });
    }

    return new Response(JSON.stringify({ url: payload.data.attributes.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
};

# Logotypes SDK utility: feature_add
module LogotypesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

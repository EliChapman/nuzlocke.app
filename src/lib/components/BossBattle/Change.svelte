<script>
  import { Icon } from '$c/core'
  import { Loop } from '$icons'
</script>

<div
  class="relative z-50 inline-block h-8 w-8 {$$restProps.containerClass || ''} "
>
  <span class="flex pl-1">
    <Icon
      inline
      class="absolute rounded-full  {$$restProps.class ||
        'bg-white dark:bg-gray-900'}"
      height="1.4em"
      icon={Loop}
    />
  </span>
  <p class="absolute left-.5 bottom-7 font-mono text-2xl">chg</p>
</div>

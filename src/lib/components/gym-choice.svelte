<script>
  export let game,
    store,
    location,
    starter,
    gyms,
    forceVs

    let loading = true

    import AutoCompleteV2 from '$c/core/AutoCompleteV2.svelte'
    import { nonnull, equal as oEqual } from '$utils/obj'
    import { read, patch, removelocation } from '$lib/store'
    import GymCard from '$lib/components/gym-card.svelte'

    let selected, gym, hidden

    let gymSearch, gymNames = gyms.map(gym => gym.boss);

    let resetd, hiddenLength, bossTeamIds = []
    store &&
        store.subscribe(
        read((data) => {
            hiddenLength = data?.__hidden?.length

            const chosen = data[location + " Opponent"]
            bossTeamIds = (data.__teams || []).map((i) => i.id)
            if (!chosen) return

            resetd = chosen
            gym = chosen.gym

            if (chosen.gym) {
                loading = false
            }
        })
        )

    $: {
        const topatch = nonnull({
            gym: gym
        })

        if (gym && !oEqual(topatch, resetd)) {
            console.log('Patching', location + " Opponent")
            store.update(patch({ [location + " Opponent"]: topatch }))
        }
    }

</script>

{#if gym}
    <GymCard
        forceVs={forceVs}
        {starter}
        game={game}
        id={gyms[gymNames.indexOf(gym)].value}
        defeated={bossTeamIds.includes(gyms[gymNames.indexOf(gym)].value)}
        location={location}
        type={gyms[gymNames.indexOf(gym)]}
        choice = {true}
        resetFunction = { (id) => { 
            store.update(patch({ [id]: "" }))
            gym = ""
        }}
    />
{:else}
    <AutoCompleteV2
        itemF={(_) => gymNames}
        max={gyms.length}
        bind:search={gymSearch}
        bind:selected={gym}
        id="{location} Opponent"
        name="{location} Opponent"
        placeholder="Opponent"
        class="col-span-1 {!selected || status?.id === 4 || hidden
        ? 'hidden sm:block'
        : ''}"
        >
        <div
            class="group -mx-1 flex inline-flex w-full items-center justify-between py-2 px-1 md:py-3"
            slot="option"
            let:label
        >
            <span>{@html label}</span>
        </div>
    </AutoCompleteV2>
{/if}
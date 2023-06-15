<script setup>
import { ref, watch, h } from 'vue';
import {
  NIcon,
  NTag,
  NAvatar,
  NText,
  NSelect,
} from "naive-ui";
import { MdPeople } from "@vicons/ionicons4";
import IconSpin from "@/components/IconSpin.vue";

const props = defineProps({
  members: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
const emits = defineEmits(['update']);
// 多選下拉選單
const renderMultipleSelectTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: "0 6px 0 4px",
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation();
        handleClose();
      },
    },
    {
      default: () =>
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
            },
          },
          [
            h(NAvatar, {
              src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
              round: true,
              size: 22,
              style: {
                marginRight: "4px",
              },
            }),
            option.label,
          ]
        ),
    }
  );
};
const renderLabel = (option) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [
      h(NAvatar, {
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        round: true,
        size: "small",
      }),
      h(
        "div",
        {
          style: {
            marginLeft: "12px",
            padding: "4px 0",
          },
        },
        [
          h("div", null, [option.label]),
          h(
            NText,
            { depth: 3, tag: "div" },
            {
              default: () => "description",
            }
          ),
        ]
      ),
    ]
  );
};
// 之後改為接收工作區成員
const memberOptions = [
  {
    label: "07akioni",
    value: "07akioni",
  },
  {
    label: "08akioni",
    value: "08akioni",
  },
  {
    label: "09akioni",
    value: "09akioni",
  },
];
const members = ref(props.members);
watch(() => members.value ,() => {
  emits("update", members.value);
})
</script>
<template>
  <div class="flex items-center">
    <label for="cardMembers" class="mr-4">
      <n-icon v-if="!props.isLoading" size="20" :component="MdPeople" class="text-gray-500 block" />
      <IconSpin v-else />
    </label>
    <div class="w-full">
      <n-select
        id="cardMembers"
        multiple
        :options="memberOptions"
        :render-label="renderLabel"
        :render-tag="renderMultipleSelectTag"
        v-model:value="members"
        filterable
      />
    </div>
  </div>
</template>
<style>

</style>

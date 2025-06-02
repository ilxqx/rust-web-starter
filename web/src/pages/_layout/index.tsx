import type { OnChangeFn } from "@tanstack/react-table";

import { Button, Group, Input, Loader, Modal, Pagination, Radio, rem, Select, Stack, Table, Text, Title } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPlus, IconSearch } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { isFunction } from "radashi";
import { useEffect, useMemo, useState } from "react";
import z from "zod";

import type { User, UserParams } from "../../apis";

import { createUser, deleteUser, getUserPage, updateUser } from "../../apis";
import { Form, LoadingPlaceholder, useAppForm } from "../../components";

export const Route = createFileRoute("/_layout/")({
  component: UserPage,
});

function UserPage() {
  const [mode, setMode] = useState<"create" | "update">("create");
  const [userToBeUpdated, setUserToBeUpdated] = useState<User | null>(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebouncedValue(keyword, 500);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 15,
  });

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedKeyword, pagination],
    queryFn: () => getUserPage({
      keyword: debouncedKeyword,
      ...pagination,
    }),
    select(data) {
      return data.data;
    },
  });

  const {
    AppForm,
    AppField,
    SubmitButton,
    handleSubmit,
  } = useUserModalForm(mode, userToBeUpdated, closeModal);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);

    if (pagination.page !== 1) {
      setPagination(prev => {
        return {
          ...prev,
          page: 1,
        };
      });
    }
  };

  const isSearching = keyword !== debouncedKeyword || isFetching;

  return (
    <Stack flex="auto">
      <Group flex="none" justify="space-between">
        <Title order={2}>用户管理</Title>

        <Group>
          <Input
            placeholder="搜索关键词"
            rightSection={isSearching && <Loader size={16} />}
            value={keyword}
            w={240}
            onChange={e => handleKeywordChange(e.target.value)}
          />

          <Button leftSection={<IconSearch size={16} />} variant="outline" onClick={() => refetch()}>
            搜索
          </Button>

          <Button
            leftSection={<IconPlus size={16} />}
            variant="outline"
            onClick={() => {
              setMode("create");
              openModal();
            }}
          >
            新增
          </Button>
        </Group>
      </Group>

      <Stack flex="auto" gap="xs">
        {
          isLoading
            ? <LoadingPlaceholder />
            : (
                <UserTable
                  items={data!.items}
                  pagination={pagination}
                  setPagination={setPagination}
                  total={data!.total}
                  updateUser={user => {
                    setUserToBeUpdated(user);
                    setMode("update");
                    openModal();
                  }}
                />
              )
        }
      </Stack>

      <Modal opened={modalOpened} size="lg" title={mode === "create" ? "新增用户" : "更新用户"} onClose={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Stack>
            <Group>
              <AppField name="name">
                {({ TextField }) => <TextField withAsterisk flex={1} label="姓名" placeholder="请输入姓名" />}
              </AppField>

              <AppField name="gender">
                {({ RadioSelectField }) => (
                  <RadioSelectField withAsterisk flex={1} label="性别">
                    <Group h={36}>
                      <Radio label="男" value="male" />
                      <Radio label="女" value="female" />
                    </Group>
                  </RadioSelectField>
                )}
              </AppField>
            </Group>

            <Group>
              <AppField name="account">
                {({ TextField }) => <TextField withAsterisk flex={1} label="账号" placeholder="请输入账号" />}
              </AppField>

              <AppField name="password">
                {({ PasswordField }) => <PasswordField flex={1} label="密码" placeholder="请输入密码" withAsterisk={mode === "create"} />}
              </AppField>
            </Group>

            <Group>
              <AppField name="mobilePhone">
                {({ TextField }) => <TextField withAsterisk flex={1} label="手机号" placeholder="请输入手机号" />}
              </AppField>

              <AppField name="birthday">
                {({ DatePickerField }) => <DatePickerField withAsterisk flex={1} label="生日" placeholder="请选择生日" />}
              </AppField>
            </Group>

            <AppField name="enabled">
              {({ SwitchField }) => <SwitchField flex={1} fw={500} label="启用状态" labelPosition="left" />}
            </AppField>

            <AppForm>
              <Group justify="flex-end">
                <SubmitButton leftSection={<IconCheck size={16} />}>提交</SubmitButton>
              </Group>
            </AppForm>
          </Stack>
        </Form>
      </Modal>
    </Stack>
  );
}

function useUserModalForm(mode: "create" | "update", userToBeUpdated: User | null, closeModal: () => void) {
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: (user: UserParams) => {
      if (mode === "create") {
        return createUser(user);
      } else {
        return updateUser(user);
      }
    },
    onSuccess() {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    AppForm,
    AppField,
    SubmitButton,
    handleSubmit,
    reset,
  } = useAppForm({
    defaultValues: mode === "create"
      ? {
          gender: "male",
          enabled: true,
        }
      : userToBeUpdated as Partial<UserParams>,
    validators: {
      onSubmit: z.object({
        name: z.string().nonempty("请输入姓名"),
        account: z.string().nonempty("请输入账号"),
        password: mode === "create" ? z.string().nonempty("请输入密码") : z.string().optional().default(""),
        gender: z.enum(["male", "female"]),
        mobilePhone: z.string().nonempty("请输入手机号"),
        birthday: z.string().nonempty("请输入生日"),
        enabled: z.boolean(),
      }),
    },
    async onSubmit({ value }) {
      const { message } = await userMutation.mutateAsync(value as UserParams);
      showNotification({
        title: "成功",
        message,
        color: "green",
      });
    },
  });

  useEffect(() => {
    if (mode === "create") {
      reset({
        gender: "male",
        enabled: true,
      });
    } else if (userToBeUpdated) {
      reset(userToBeUpdated as Partial<UserParams>);
    }
  }, [mode, userToBeUpdated, reset]);

  return {
    AppForm,
    AppField,
    SubmitButton,
    handleSubmit,
  };
}

const columnHelper = createColumnHelper<User>();

const pageSizeOptions = [
  {
    label: "10 条/页",
    value: "10",
  },
  {
    label: "15 条/页",
    value: "15",
  },
  {
    label: "20 条/页",
    value: "20",
  },
  {
    label: "30 条/页",
    value: "30",
  },
  {
    label: "50 条/页",
    value: "50",
  },
  {
    label: "100 条/页",
    value: "100",
  },
];

function UserTable(
  {
    items,
    pagination,
    total,
    setPagination,
    updateUser,
  }: {
    items: User[];
    total: number;
    pagination: {
      page: number;
      size: number;
    };
    setPagination: OnChangeFn<{
      page: number;
      size: number;
    }>;
    updateUser: (user: User) => void;
  },
) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showNotification({
        title: "成功",
        message: "删除成功",
        color: "green",
      });
    },
  });

  const columns = useMemo(() => [
    columnHelper.accessor("id", {
      header: "ID",
      size: 200,
    }),
    columnHelper.accessor("name", {
      header: "姓名",
      size: 100,
    }),
    columnHelper.accessor("account", {
      header: "账号",
      size: 120,
    }),
    columnHelper.accessor("mobilePhone", {
      header: "手机号",
      size: 180,
    }),
    columnHelper.accessor("gender", {
      header: "性别",
      size: 100,
      cell({ getValue }) {
        return getValue() === "male" ? "👨" : "👩";
      },
    }),
    columnHelper.accessor("birthday", {
      header: "生日",
      size: 120,
    }),
    columnHelper.accessor("enabled", {
      header: "状态",
      size: 100,
      cell({ getValue }) {
        const value = getValue();

        return (
          <Text span c={value ? "green" : "red"} fw={500} size="sm">
            {value ? "启用" : "禁用"}
          </Text>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "创建时间",
      size: 180,
    }),
    columnHelper.accessor("updatedAt", {
      header: "更新时间",
      size: 180,
    }),
    columnHelper.display({
      id: "actions",
      header: "操作",
      cell({ row }) {
        return (
          <Group gap="xs">
            <Button radius="xs" size="compact-xs" variant="light" onClick={() => updateUser(row.original)}>修改</Button>
            <Button color="red" radius="xs" size="compact-xs" variant="light" onClick={() => mutate(row.original.id)}>删除</Button>
          </Group>
        );
      },
    }),
  ], [updateUser, mutate]);

  const table = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.size,
      },
    },
    onPaginationChange(updaterOrValue) {
      if (isFunction(updaterOrValue)) {
        setPagination(state => {
          const result = updaterOrValue({
            pageIndex: state.page - 1,
            pageSize: state.size,
          });

          return {
            page: result.pageIndex + 1,
            size: result.pageSize,
          };
        });
      } else {
        setPagination({
          page: updaterOrValue.pageIndex + 1,
          size: updaterOrValue.pageSize,
        });
      }
    },
    rowCount: total,
  });

  return (
    <>
      <Table.ScrollContainer flex="auto" minWidth={0}>
        <Table
          highlightOnHover
          withTableBorder
          horizontalSpacing="xs"
          verticalSpacing="sm"
        >
          <Table.Thead bg="gray.1">
            {
              table.getHeaderGroups().map(headerGroup => (
                <Table.Tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(
                      header => (
                        <Table.Th key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </Table.Th>
                      ),
                    )
                  }
                </Table.Tr>
              ))
            }
          </Table.Thead>

          <Table.Tbody>
            {
              table.getRowModel().rows.map(row => (
                <Table.Tr key={row.id}>
                  {
                    row.getVisibleCells()
                      .map(
                        cell => (
                          <Table.Td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Table.Td>
                        ),
                      )
                  }
                </Table.Tr>
              ))
            }
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Group flex="none" justify="space-between">
        <Group gap="xs">
          <Text c="dimmed" size="sm">每页显示</Text>

          <Select
            data={pageSizeOptions}
            value={String(pagination.size)}
            w={120}
            style={{
              "--input-size": rem(32),
              "--input-height": rem(32),
              "--input-line-height": `calc(var(--input-height) - ${rem(2)})`,
            }}
            onChange={value => {
              if (value) {
                table.setPageSize(Number(value));
              }
            }}
          />

          <Text c="dimmed" size="sm">
            总共
            {" "}
            <Text span c="blue">{table.getRowCount()}</Text>
            {" "}
            条
          </Text>
        </Group>

        <Pagination
          withEdges
          size="md"
          total={table.getPageCount()}
          value={pagination.page}
          onChange={value => {
            table.setPageIndex(value - 1);
          }}
        />
      </Group>
    </>
  );
}
